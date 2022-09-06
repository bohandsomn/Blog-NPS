import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface ActivationCreationAttributes {
    userId: number
}

@Table({tableName: 'activation'})
export class Activation extends Model<Activation, ActivationCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ApiProperty({example: 1, description: 'Unique user id'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @ApiProperty({example: true, description: 'Is activation'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    value: boolean
}