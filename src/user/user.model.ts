import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'
import { UserChatRole } from 'src/user/user-chat-role.model'
import { UserChat } from 'src/chat/user-chat.model'
import { Privacy } from 'src/privacy/privacy.model'
import { UserRole } from './user-role.model'

interface UserCreationAttributes {
    name: string
    email: string
    login: string
    password: string
    privacyId: number
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, defaultValue: null})
    surname: string | null

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    login: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.TIME, defaultValue: null})
    birthday: string | null

    @ForeignKey(() => Privacy)
    @Column({type: DataType.INTEGER, allowNull: false })
    privacyId: number

    @BelongsToMany(() => Chat, () => UserChat)
    chats: Chat[]

    @BelongsToMany(() => UserChatRole, () => UserRole)
    roles: UserChatRole[]
}