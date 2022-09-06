import { ApiProperty } from '@nestjs/swagger'
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
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 1})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false })
    userId: number

    @ApiProperty({example: 'relative/file/path'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    original: string

    @ApiProperty({example: 'relative/file/path'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    post: string

    @ApiProperty({example: 'relative/file/path'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    preview: string

    @ApiProperty({example: 'relative/file/path'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    message: string
}