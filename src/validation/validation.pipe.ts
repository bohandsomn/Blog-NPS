import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(
        private readonly i18nService: I18nService
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value)
        const errors = await validate(object)

        if (errors.length) {
            const messages = errors
                .map(({property, constraints}) => {
                    const values = Object
                        .values(constraints)
                        .map((value) => {
                            const [smth] = value.split('|')
                            return this.i18nService.t<string>(smth)
                        })
                        
                    return `${property} - ${values.join(', ')}`
                })
                .join('; ')
            throw new HttpException(messages, HttpStatus.BAD_REQUEST)
        }

        return value
    }
}
