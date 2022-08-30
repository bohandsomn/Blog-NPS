import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'

interface CommentCreationAttributes {
    userId: number
    postId: number
    content: string
}

@Table({tableName: 'comment'})
export class Comment extends Model<Comment, CommentCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number
    
    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER, allowNull: false})
    postId: number
    
    @Column({type: DataType.STRING, allowNull: false})
    content: string
}