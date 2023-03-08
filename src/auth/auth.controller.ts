import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, TokenResponseDto } from './dto'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
} from '@nestjs/swagger'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOkResponse({
        description: 'User successfully signed in.',
        type: TokenResponseDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @ApiCreatedResponse({
        description: 'User successfully signed up.',
        type: TokenResponseDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Post('signup')
    signUp(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto)
    }
}
