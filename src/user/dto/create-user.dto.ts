import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    IsString,
    IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ required: true })
    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName?: string
}
