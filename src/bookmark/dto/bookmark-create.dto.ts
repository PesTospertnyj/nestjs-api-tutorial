import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BookmarkCreateDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    link: string

    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    userId: number
}
