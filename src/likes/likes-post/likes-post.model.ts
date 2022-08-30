import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'

interface LikesPostCreationAttributes {
    userId: number
    postId: number
    value: boolean
}

@Table({tableName: 'likes_post'})
export class LikesPost extends Model<LikesPost, LikesPostCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER, allowNull: false })
    postId: number
    
    @Column({type: DataType.BOOLEAN, allowNull: false})
    value: boolean
}