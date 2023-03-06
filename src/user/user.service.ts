import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async getById(id: number) {
        const user = await this.prisma.user.findFirst({ where: { id: id } })
        return user;
    }
}
