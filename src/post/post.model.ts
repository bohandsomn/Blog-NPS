import { ApiProperty } from '@nestjs/swagger'
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
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "We solved an important problem"})
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @ApiProperty({example: "During an hour of discussion of an important problem, we found a solution"})
    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ApiProperty({example: 1})
    @ForeignKey(() => Privacy)
    @Column({type: DataType.INTEGER, allowNull: false })
    privacyId: number
}