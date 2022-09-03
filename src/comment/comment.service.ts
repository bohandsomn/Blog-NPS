import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { Comment } from './comment.model'
import { CommentCreateDTO } from './DTO/comment-create.dto'
import { CommentUpdateDTO } from './DTO/comment-update.dto'

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment) private readonly commentRepository: typeof Comment,
        private readonly i18nService: I18nService
    ) { }

    async getByPostId(postId: string) {
        const comments = await this.commentRepository.findAll({where: {postId: parseInt(postId)}})
        return comments
    }
    
    async create(dto: CommentCreateDTO & {userId: number}) {
        const comment = await this.commentRepository.create({
            userId: dto.userId,
            postId: parseInt(dto.postId),
            content: dto.content,
        })
        return comment
    }

    async update(dto: CommentUpdateDTO) {
        await this.verify(parseInt(dto.commentId), true)
        const comment = await this.commentRepository.findByPk(parseInt(dto.commentId))
        comment.content = dto.content
        await comment.save()
        return comment
    }

    async delete(commentId: string) {
        return this.commentRepository.destroy({where: {id: parseInt(commentId)}})
    }

    async verify(commentId: number, mustHave = false) {
        const hasPost = !!await this.commentRepository.findByPk(commentId)
        if (hasPost !== mustHave) {
            throw new HttpException(this.i18nService.t<string>('exception.comment.verify.not-found'), HttpStatus.NOT_FOUND)
        }
    }
}
