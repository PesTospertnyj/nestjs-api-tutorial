import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as argon from 'argon2'
import { AuthDto, TokenResponseDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private userService: UserService
    ) {}

    TokenExpiration = '15m'

    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        })

        if (!user) {
            throw new ForbiddenException('Credentials incorrect')
        }

        const match = await argon.verify(user.hash, dto.password)
        if (!match) {
            throw new ForbiddenException('Credentials incorrect')
        }

        return this.signToken(user.id, user.email)
    }

    async signUp(dto: CreateUserDto) {
        const user = await this.userService.create(dto)

        return this.signToken(user.id, user.email)
    }

    async signToken(
        userID: number,
        email: string
    ): Promise<{ access_token: string }> {
        const token = await this.jwt.signAsync(
            {
                sub: userID,
                email: email,
            },
            {
                secret: this.config.get('JWT_SECRET' || 'somesupersecret'),
                expiresIn: this.TokenExpiration,
            }
        )

        return new TokenResponseDto(token)
    }
}
