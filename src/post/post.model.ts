import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Privacy } from 'src/privacy/privacy.model'
import { User } from 'src/user/user.model'

interface PostCreationAttributes {
    title: string
    content: string
    userId: number
    privacyId: number
}

@Table({tableName: 'post'})
export class Post extends Model<Post, PostCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => Privacy)
    @Column({type: DataType.INTEGER, allowNull: false })
    privacyId: number
}