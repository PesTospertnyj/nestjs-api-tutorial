import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsStrongPassword()
    @IsString()
    @IsOptional()
    password?: string

    @IsString()
    @IsOptional()
    firstName?: string

    @IsString()
    @IsOptional()
    lastName?: string
}
