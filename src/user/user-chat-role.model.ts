import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { UserRole } from './user-role.model'

interface UserChatRoleCreationAttributes {
    value: string
}

@Table({tableName: 'user_chat_role'})
export class UserChatRole extends Model<UserChatRole, UserChatRoleCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}