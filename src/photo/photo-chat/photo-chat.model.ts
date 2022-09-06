import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'

interface PhotoChatCreationAttributes {
    chatId: number
    preview: string
}

@Table({tableName: 'photo_chat'})
export class PhotoChat extends Model<PhotoChat, PhotoChatCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 1})
    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false })
    chatId: number

    @ApiProperty({example: 'relative/file/path'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    preview: string
}