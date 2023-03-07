import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto'
import * as argon from 'argon2'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getById(id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: id } })
        return user
    }

    async update(id: number, dto: UpdateUserDto) {
        let data: {}
        if (dto.password.length > 1) {
            const hash = await argon.hash(dto.password)
            delete dto.password
            data = { hash: hash }
        }

        data = { ...data, ...dto }
        const user = await this.prisma.user.update({
            where: { id: id },
            data: data,
        })

        return user
    }
}
