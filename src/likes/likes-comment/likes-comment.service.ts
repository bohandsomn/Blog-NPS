import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { LikesCommentChangeDTO } from 'src/likes/likes-comment/DTO/likes-comment-change.dto'
import { LikesCommentCreateDTO } from './DTO/likes-comment-create.dto'
import { LikesCommentGetOneDTO } from './DTO/likes-comment-get-one.dto'
import { LikesComment } from './likes-comment.model'

@Injectable()
export class LikesCommentService {
    constructor(
        @InjectModel(LikesComment) private readonly likesCommentRepository: typeof LikesComment
    ) { }

    async like(dto: LikesCommentChangeDTO) {
        return this.change({...dto, value: true})
    }

    async dislike(dto: LikesCommentChangeDTO) {
        return this.change({...dto, value: false})
    }

    async unlike(dto: LikesCommentChangeDTO) {
        return this.change({...dto, value: null})
    }

    async change(dto: LikesCommentChangeDTO & {value: boolean | null}) {
        const likesComment = await this.getOne(dto)
        if (!likesComment) {
            return this.create({...dto, value: dto.value})
        }
        likesComment.value = dto.value
        await likesComment.save()
        return likesComment
    }

    async create(dto: LikesCommentCreateDTO) {
        return this.likesCommentRepository.create({
            userId: dto.userId,
            commentId: parseInt(dto.commentId),
            value: dto.value,
        })
    }

    async getOne(dto: LikesCommentGetOneDTO) {
        return this.likesCommentRepository.findOne({
            where: {
                [Op.and]: {
                    userId: dto.userId,
                    commentId: parseInt(dto.commentId)
                }
            }
        })
    }
}
