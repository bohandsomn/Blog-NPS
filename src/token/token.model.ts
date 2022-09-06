import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface TokenCreationAttributes {
    userId: number
    value: string
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @ApiProperty({example: 'vnheoiunbvuierjnbvhjiurenf.efwen9fucvienb9ifcvwp.ewvconbecuw'})
    @Column({type: DataType.TEXT, allowNull: false})
    value: string
}