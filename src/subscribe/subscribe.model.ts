import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface SubscribeCreationAttributes {
    userId: number
    subscriberId: number
}

@Table({tableName: 'subscribe'})
export class Subscribe extends Model<Subscribe, SubscribeCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    subscriberId: number
}