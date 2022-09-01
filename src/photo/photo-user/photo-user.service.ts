import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import * as FileSystem from 'fs'
import * as path from 'path'
import { PhotoUser } from 'src/photo/photo-user/photo-user.model'
import { PhotoUserCreateDTO } from './DTO/photo-user-create.dto'
import { PhotoUserGetDTO } from './DTO/photo-user-get.dto'
import { PhotoUserUpdateDTO } from './DTO/photo-user-update.dto'
import { PhotoResizePipe } from '../transformation/photo-resize.pipe'

@Injectable()
export class PhotoUserService {
    constructor(
        @InjectModel(PhotoUser) private readonly photoUserRepository: typeof PhotoUser,
        private readonly i18nService: I18nService
    ) { }

    async getOriginal(dto: PhotoUserGetDTO) {
        const photo = await this.getByUserId(parseInt(dto.userId))
        return this.getStream(photo.original)
    }

    async getPost(dto: PhotoUserGetDTO) {
        const photo = await this.getByUserId(parseInt(dto.userId))
        return this.getStream(photo.post)
    }

    async getPreview(dto: PhotoUserGetDTO) {
        const photo = await this.getByUserId(parseInt(dto.userId))
        return this.getStream(photo.preview)
    }

    async getMessage(dto: PhotoUserGetDTO) {
        const photo = await this.getByUserId(parseInt(dto.userId))
        return this.getStream(photo.message)
    }

    async create(dto: PhotoUserCreateDTO) {
        const photo = await this.getByUserId(dto.userId)
        if (photo) {
            throw new HttpException(this.i18nService.t<string>('exception.photo-user.create.has-id'), HttpStatus.CONFLICT)
        }

        return this.photoUserRepository.create(dto)
    }

    async update(dto: PhotoUserUpdateDTO) {
        const photo = await this.getByUserId(dto.userId)
        if (!photo) {
            return await this.create(dto)
        }
        
        photo.post = dto.post
        photo.preview = dto.preview
        photo.message = dto.message
        photo.original = dto.original

        await photo.save()
        return photo
    }

    async delete(userId: number) {
        return this.photoUserRepository.destroy({where: {userId}})
    }

    private async getByUserId(userId: number) {
        const photo = await this.photoUserRepository.findOne({where: {userId}})
        return photo
    }

    private getStream(filePath: string) {
        const fullPath = path.join(PhotoResizePipe.staticPath, filePath)
        return FileSystem.createReadStream(fullPath)
    }
}
