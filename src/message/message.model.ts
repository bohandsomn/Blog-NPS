import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'

interface MessageCreationAttributes {
    userId: number
    chatId: number
    content: string
}

@Table({tableName: 'message'})
export class Message extends Model<Message, MessageCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false})
    chatId: number
    
    @Column({type: DataType.STRING, allowNull: false})
    content: string
}