import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { UserChatRole } from './user-chat-role.model'

@Table({tableName: 'user-role', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => UserChatRole)
    @Column({type: DataType.INTEGER})
    roleId: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}