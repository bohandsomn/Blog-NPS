import { Body, Controller, Get, Patch } from '@nestjs/common'
import { StyleService } from './style.service'

@Controller('style')
export class StyleController {
    constructor(
        private readonly styleService: StyleService
    ) { }

    @Get()
    getStyles() {
        return this.styleService.getStyles()
    }

    @Patch()
    updateGeneral(@Body() data: object) {
        return this.styleService.updateGeneral(data)
    }

    @Patch()
    updateDark(@Body() data: object) {
        return this.styleService.updateDark(data)
    }

    @Patch()
    updateLight(@Body() data: object) {
        return this.styleService.updateLight(data)
    }
}
