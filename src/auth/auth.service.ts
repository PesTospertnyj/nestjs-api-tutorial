import { ForbiddenException, HttpException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { use } from "passport";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    ErrCodeUserExists = 'P2002'
    TokenExpiration = '15m'

    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            }
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


    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                },
            })

            delete user.hash;

            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === this.ErrCodeUserExists) {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error
        }

    }

    async signToken(userID: number, email: string): Promise<{ access_token: string }> {
        const token = await this.jwt.signAsync({
            sub: userID,
            email: email,
        }, {
            secret: this.config.get('JWT_SECRET' || 'somesupersecret'),
            expiresIn: this.TokenExpiration
        })

        return { access_token: token }
    }
}