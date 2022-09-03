import { Injectable } from '@nestjs/common'
import * as FileSystem from 'fs'
import * as path from 'path'
import { StylesData, TagName, Theme, Variable } from './style-file.interface'

@Injectable()
export class StyleFileService {
    public readonly __dirname = path.resolve()

    getStylePath(tagname: TagName) {
        return path.join(this.__dirname, 'src', 'style-file', 'styles', tagname + '.json')
    }
    createStyle(tagname: TagName, data: StylesData) {
        const tagPath = this.getStylePath(tagname)
        FileSystem.writeFileSync(tagPath, JSON.stringify(data, null, 4))
    }
    getStyle(tagname: TagName) {
        const tagPath = this.getStylePath(tagname)
        const data: string = FileSystem.readFileSync(tagPath, 'utf-8')
        return JSON.parse(data)
    }
    getStyles(): StylesData {
        return {
            ...this.getStyle('button'), 
            ...this.getStyle('div'), 
            ...this.getStyle('form'), 
            ...this.getStyle('h1'), 
            ...this.getStyle('h3'), 
            ...this.getStyle('header'), 
            ...this.getStyle('img'), 
            ...this.getStyle('input'), 
            ...this.getStyle('label'), 
            ...this.getStyle('li'), 
            ...this.getStyle('nav'), 
            ...this.getStyle('p'), 
            ...this.getStyle('path'), 
            ...this.getStyle('section'), 
            ...this.getStyle('span'), 
            ...this.getStyle('svg'), 
            ...this.getStyle('textarea'), 
            ...this.getStyle('ul'),
        }
    }

    getVariablePath<V extends Variable>(variable: V) {
        return path.join(this.__dirname, 'src', 'style-file', 'styles', 'variables', variable + '.json')
    }
    createVariable<V extends Variable>(variable: V, newData: object): void { 
        const path = this.getVariablePath(variable)
        const data = this.getVariable(variable)
        const [key] = Object.keys(data[variable])

        FileSystem.writeFileSync(path, JSON.stringify({
            [key]: {
                ...data[variable][key], 
                ...newData
            }
        }, null, 4))
    }
    getVariable<V extends Variable>(variable: V): Theme<V> {
        const path = this.getVariablePath(variable)
        const string = FileSystem.readFileSync(path, 'utf-8')
        return {
            [variable]: JSON.parse(string)
        } as Theme<V>
    }
    getVariables() {
        const general = this.getVariable('general')
        const light = this.getVariable('light')
        const dark = this.getVariable('dark')

        return {
            ...general,
            ...light,
            ...dark,
        }
    }
    updateVariable(newData: object, variable: Variable) {
        this.createVariable(variable, newData)
        return this.getVariable(variable)
    }
}
