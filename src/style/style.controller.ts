import { Body, Controller, Get, Patch } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { StyleService } from './style.service'

@ApiTags('Style')
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
    @Patch()
    updateGeneral(@Body() data: object) {
        return this.styleService.updateGeneral(data)
    }

    @ApiOperation({summary: 'Style dark update'})
    @Patch()
    updateDark(@Body() data: object) {
        return this.styleService.updateDark(data)
    }

    @ApiOperation({summary: 'Style light update'})
    @Patch()
    updateLight(@Body() data: object) {
        return this.styleService.updateLight(data)
    }
}
