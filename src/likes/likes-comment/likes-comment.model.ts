import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Comment } from 'src/comment/comment.model'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'

interface LikesCommentCreationAttributes {
    userId: number
    commentId: number
    value: boolean
}

@Table({tableName: 'likes_comment'})
export class LikesComment extends Model<LikesComment, LikesCommentCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER, allowNull: false })
    commentId: number
    
    @Column({type: DataType.BOOLEAN, allowNull: false})
    value: boolean
}