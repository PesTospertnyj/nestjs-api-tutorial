import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getById(id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: id } })
        return user
    }

    async update(id: number, dto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: { id: id },
            data: dto,
        })
    }
}
