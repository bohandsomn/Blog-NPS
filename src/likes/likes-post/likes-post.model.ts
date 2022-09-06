import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'

interface LikesPostCreationAttributes {
    userId: number
    postId: number
    value: boolean | null
}

@Table({tableName: 'likes_post'})
export class LikesPost extends Model<LikesPost, LikesPostCreationAttributes> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ApiProperty({example: 1})
    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER, allowNull: false })
    postId: number
    
    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN, allowNull: true })
    value: boolean
}