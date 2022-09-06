import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface SubscribeCreationAttributes {
    userId: number
    subscriberId: number
}

@Table({tableName: 'subscribe'})
export class Subscribe extends Model<Subscribe, SubscribeCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ApiProperty({example: 2})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    subscriberId: number
}