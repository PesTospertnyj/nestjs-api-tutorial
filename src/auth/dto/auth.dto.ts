import { IsEmail, IsNotEmpty, isString, IsString, IsStrongPassword } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string
}
