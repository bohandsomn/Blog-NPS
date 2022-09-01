import { Injectable, PipeTransform } from '@nestjs/common'
import * as uuid from 'uuid'
import * as path from 'path'
import * as FileSystem from 'fs'
import * as sharp from 'sharp'

type Option = {
    readonly width: number
    readonly height: number
}

export type Size = 'original' | 'post' | 'preview' | 'message'
type PhotoSize = Readonly<Record<Size, Option>>

@Injectable()
export class PhotoResizePipe implements PipeTransform {
    public static readonly staticPath = path.join(__dirname, '..', '..', 'static')

    private readonly PHOTO_SIZE: PhotoSize = {
        original: {width: 200, height: 200},
        post: {width: 75, height: 75},
        preview: {width: 60, height: 60},
        message: {width: 20, height: 20},
    }

    constructor(
        private readonly sizes: Size[]
    ) { }

    private getUnique() {
        const unique = uuid.v4()
        return unique
    }

    private getExtention(originalname: string) {
        const extention = originalname.split('.').pop()
        return extention
    }

    private getFileOut(filePath: string, fileName: string) {
        const fileOut = path.join(filePath, fileName)
        return fileOut
    }

    private validateDirectory(path: string) {
        if (!FileSystem.existsSync(path)) {
            FileSystem.mkdirSync(path, {recursive: true})
        }
    }

    private getOption(size: Size) {
        const option = this.PHOTO_SIZE[size]
        return option
    }

    private async save(buffer: Express.Multer.File['buffer'], size: Size, fileOut: string) {
        const option = this.getOption(size)

        await sharp(buffer)
            .resize(option.width, option.height)
            .toFile(fileOut)
    }

    async transform(file: Express.Multer.File): Promise<Record<Size, string>> {
        const subDirectoryName = this.getUnique()
        const subDirectoryPath = path.join(PhotoResizePipe.staticPath, subDirectoryName)
        this.validateDirectory(subDirectoryPath)
        const extention = this.getExtention(file.originalname)

        const filePaths: Partial<Record<Size, string>> = {}
        for (const size of this.sizes) {
            const fileName = `${size}.${extention}`
            const fileOut = this.getFileOut(subDirectoryPath, fileName)
            filePaths[size] = path.join(subDirectoryName, fileName)
            await this.save(file.buffer, size, fileOut)
        }

        return filePaths as Record<Size, string>
    }
}
