import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto'
import * as argon from 'argon2'
import { Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    ErrCodeUserExists = 'P2002'

    async getById(id: number) {
        return await this.prisma.user.findFirst({ where: { id: id } })
    }

    async create(dto: CreateUserDto) {
        const hash = await argon.hash(dto.password)
        try {
            return await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === this.ErrCodeUserExists) {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error
        }
    }

    async update(id: number, dto: UpdateUserDto) {
        let data: object
        if (dto.password && dto.password.length > 1) {
            const hash = await argon.hash(dto.password)
            delete dto.password
            data = { hash: hash }
        }

        data = { ...data, ...dto }
        return await this.prisma.user.update({
            where: { id: id },
            data: data,
        })
    }
}
