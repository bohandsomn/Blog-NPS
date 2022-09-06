import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Privacy } from 'src/privacy/privacy.model'
import { User } from 'src/user/user.model'
import { UserChat } from './user-chat.model'

interface ChatCreationAttributes {
    name: string
    privacyId: number
}

@Table({tableName: 'chat'})
export class Chat extends Model<Chat, ChatCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Group to discuss an important issue'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: 1})
    @ForeignKey(() => Privacy)
    @Column({type: DataType.INTEGER, allowNull: false })
    privacyId: number

    @BelongsToMany(() => User, () => UserChat)
    users: User[]
}