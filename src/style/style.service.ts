import { Injectable } from '@nestjs/common'
import { StyleFileService } from 'src/style-file/style-file.service'

@Injectable()
export class StyleService {
    constructor(
        private readonly styleFileService: StyleFileService
    ) { }

    getStyles() {
        const styles = this.styleFileService.getStyles()
        const variables = this.styleFileService.getVariables()
        return {
            ...styles,
            variables
        }
    }

    updateLight(data: object) {
        const theme = this.styleFileService.updateVariable(data, 'light')
        const stylesData = this.styleFileService.getStyles()
        return {
            ...stylesData,
            ...theme
        }
    }

    updateDark(data: object) {
        const theme = this.styleFileService.updateVariable(data, 'dark')
        const stylesData = this.styleFileService.getStyles()
        return {
            ...stylesData,
            ...theme
        }
    }

    updateGeneral(data: object) {
        const theme = this.styleFileService.updateVariable(data, 'general')
        const stylesData = this.styleFileService.getStyles()
        return {
            ...stylesData,
            ...theme
        }
    }
}
