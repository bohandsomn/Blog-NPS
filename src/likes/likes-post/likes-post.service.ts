import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { LikesPostCreateDTO } from './DTO/likes-post-create.dto'
import { LikesPostGetOneDTO } from './DTO/likes-post-get-one.dto'
import { LikesPostChangeDTO } from './DTO/likes-post-change.dto'
import { LikesPost } from './likes-post.model'

@Injectable()
export class LikesPostService {
    constructor(
        @InjectModel(LikesPost) private readonly likesPostRepository: typeof LikesPost
    ) { }

    async like(dto: LikesPostChangeDTO) {
        return this.change({...dto, value: true})
    }

    async dislike(dto: LikesPostChangeDTO) {
        return this.change({...dto, value: false})
    }

    async unlike(dto: LikesPostChangeDTO) {
        return this.change({...dto, value: null})
    }

    async change(dto: LikesPostChangeDTO & {value: boolean | null}) {
        const likesPost = await this.getOne(dto)
        if (!likesPost) {
            return this.create({...dto, value: dto.value})
        }
        likesPost.value = dto.value
        await likesPost.save()
        return likesPost
    }

    async create(dto: LikesPostCreateDTO) {
        return this.likesPostRepository.create({
            userId: dto.userId,
            postId: parseInt(dto.postId),
            value: dto.value,
        })
    }

    async getOne(dto: LikesPostGetOneDTO) {
        return this.likesPostRepository.findOne({
            where: {
                [Op.and]: {
                    userId: dto.userId,
                    postId: parseInt(dto.postId)
                }
            }
        })
    }
}
