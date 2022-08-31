import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface ActivationCreationAttributes {
    userId: number
}

@Table({tableName: 'activation'})
export class Activation extends Model<Activation, ActivationCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    value: boolean
}