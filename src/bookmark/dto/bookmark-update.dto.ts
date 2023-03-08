import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BookmarkUpdateDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    link?: string
}
