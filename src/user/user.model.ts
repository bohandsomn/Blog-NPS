import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'
import { UserChatRole } from 'src/user-chat-role/user-chat-role.model'
import { UserChat } from 'src/chat/user-chat.model'
import { Privacy } from 'src/privacy/privacy.model'
import { UserRole } from '../user-chat-role/user-role.model'
import { Subscribe } from 'src/subscribe/subscribe.model'
import { ApiProperty } from '@nestjs/swagger'

interface UserCreationAttributes {
    name: string
    email: string
    login: string
    password: string
    privacyId: number
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Bohdan'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: null})
    @Column({type: DataType.STRING, defaultValue: null})
    surname: string | null

    @ApiProperty({example: 'bohdan.lukianchenko@gmail.com'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @ApiProperty({example: 'bohdan'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    login: string

    @ApiProperty({example: '12345678'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: '2003-05-26'})
    @Column({type: DataType.TIME, defaultValue: null})
    birthday: string | null

    @ApiProperty({example: 1})
    @ForeignKey(() => Privacy)
    @Column({type: DataType.INTEGER, allowNull: false })
    privacyId: number

    @BelongsToMany(() => Chat, () => UserChat)
    chats: Chat[]

    @BelongsToMany(() => UserChatRole, () => UserRole)
    roles: UserChatRole[]

    @BelongsToMany(() => User, () => Subscribe)
    users: User[]

    @BelongsToMany(() => User, () => Subscribe)
    subscribers: User[]
}