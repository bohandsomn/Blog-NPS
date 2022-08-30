import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Chat } from './chat.model'

@Table({tableName: 'user-chat', createdAt: false, updatedAt: false})
export class UserChat extends Model<UserChat> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER})
    chatId: number
}