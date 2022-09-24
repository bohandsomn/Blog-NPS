import { Body, Controller, Get, Patch, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { TransformInterceptor } from 'src/transform/transform.interceptor'
import { StyleService } from './style.service'

@ApiTags('Style')
@UseInterceptors(TransformInterceptor)
@Controller('style')
export class StyleController {
    constructor(
        private readonly styleService: StyleService
    ) { }

    @ApiOperation({summary: 'Receiving a styles'})
    @Get()
    getStyles() {
        return this.styleService.getStyles()
    }

    @ApiOperation({summary: 'Style general update'})
    @Patch('/general')
    updateGeneral(@Body() data: object) {
        return this.styleService.updateGeneral(data)
    }

    @ApiOperation({summary: 'Style dark update'})
    @Patch('/dark')
    updateDark(@Body() data: object) {
        return this.styleService.updateDark(data)
    }

    @ApiOperation({summary: 'Style light update'})
    @Patch('/light')
    updateLight(@Body() data: object) {
        return this.styleService.updateLight(data)
    }
}
