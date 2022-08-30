import { Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface TokenCreationAttributes {
    userId: number
    value: string
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @Column({type: DataType.BOOLEAN, allowNull: false})
    value: string
}