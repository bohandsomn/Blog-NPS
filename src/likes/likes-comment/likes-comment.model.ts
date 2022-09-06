import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Comment } from 'src/comment/comment.model'
import { User } from 'src/user/user.model'

interface LikesCommentCreationAttributes {
    userId: number
    commentId: number
    value: boolean | null
}

@Table({tableName: 'likes_comment'})
export class LikesComment extends Model<LikesComment, LikesCommentCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ApiProperty({example: 1})
    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER, allowNull: false })
    commentId: number
    
    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    value: boolean
}