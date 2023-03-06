import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export class BookmarkUpdateDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsString()
    link?: string
}
