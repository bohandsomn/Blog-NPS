import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'

interface PrivacyCreationAttributes {
    value: string
}

@Table({tableName: 'privacy'})
export class Privacy extends Model<Privacy, PrivacyCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @HasOne(() => User)
    user: User

    @HasOne(() => Chat)
    chat: Chat
}