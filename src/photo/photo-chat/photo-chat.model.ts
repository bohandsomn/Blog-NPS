import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'

interface PhotoChatCreationAttributes {
    chatId: number
    preview: string
}

@Table({tableName: 'photo_chat'})
export class PhotoChat extends Model<PhotoChat, PhotoChatCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false })
    chatId: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    preview: string
}