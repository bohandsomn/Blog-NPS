import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { Op } from 'sequelize'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrivacyService } from 'src/privacy/privacy.service'
import { PostCreateDTO } from './DTO/post-create.dto'
import { PostDeleteDTO } from './DTO/post-delete.dto'
import { PostGetManyDTO } from './DTO/post-get-many.dto'
import { PostUpdateDTO } from './DTO/post-update.dto'
import { Post } from './post.model'

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post) private readonly postRepository: typeof Post,
        private readonly privacyService: PrivacyService,
        private readonly i18nService: I18nService,
        private readonly paginationService: PaginationService,
    ) { }

    async getOne(postId: string) {
        await this.verify(parseInt(postId), true)
        const post = await this.postRepository.findByPk(parseInt(postId))
        return post
    }

    async getMany(query: PostGetManyDTO) {
        const privacy = await this.privacyService.getByValue(query.privacy)
        const posts = await this.postRepository.findAll({
            where: {
                [Op.or]: {
                    title: {
                        [Op.like]: `%${query.title}%`
                    },
                    content: {
                        [Op.like]: `%${query.content}%`
                    }
                },
                privacyId: privacy.id
            }
        }).then(this.paginationService.slice(parseInt(query.page)))

        return posts
    }

    async create(dto: PostCreateDTO & {userId: number}) {
        const privacy = await this.privacyService.getByValue(dto.privacy)
        const post = await this.postRepository.create({
            title: dto.title,
            content: dto.content,
            userId: dto.userId,
            privacyId: privacy.id,
        })
        return post
    }

    async update(dto: PostUpdateDTO) {
        const post = await this.getOne(dto.postId)
        const privacy = await this.privacyService.getByValue(dto.privacy)

        post.title = dto.title
        post.content = dto.content
        post.privacyId = privacy.id

        await post.save()
        return post
    }

    async delete(dto: PostDeleteDTO) {
        const post = await this.getOne(dto.postId)
        if (post.userId !== dto.userId) {
            return
        }
        return this.postRepository.destroy({where: {id: parseInt(dto.postId)}})
    }

    async verify(postId: number, mustHave = false) {
        const hasPost = !!await this.postRepository.findByPk(postId)

        if (mustHave && !hasPost) {
            throw new HttpException(this.i18nService.t<string>('exception.post.verify.not-found'), HttpStatus.NOT_FOUND)
        }

        if (!mustHave && hasPost) {
            throw new HttpException(this.i18nService.t<string>('exception.post.verify.has-value'), HttpStatus.NOT_FOUND)
        }
    }
}
