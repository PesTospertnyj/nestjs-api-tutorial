import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiProperty()
    @IsStrongPassword()
    @IsString()
    @IsOptional()
    password?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName?: string
}
