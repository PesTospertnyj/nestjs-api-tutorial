import { IsEmail, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class BookmarkCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsNotEmpty()
    link: string

    @IsNumber()
    @IsNotEmpty()
    userId: number
}
