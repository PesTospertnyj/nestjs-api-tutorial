import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
    @ApiProperty({ required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ required: true })
    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string
}

export class TokenResponseDto {
    constructor(access_token: string) {
        this.access_token = access_token
    }

    @ApiProperty()
    access_token: string
}
