import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface PhotoUserCreationAttributes {
    userId: number
    original: string
    post: string
    preview: string
    message: string
}

@Table({tableName: 'photo_user'})
export class PhotoUser extends Model<PhotoUser, PhotoUserCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    original: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    post: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    preview: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    message: string
}