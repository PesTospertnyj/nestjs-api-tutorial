import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Bookmark, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { BookmarkCreateDto, BookmarkUpdateDto } from './dto'

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    ErrUserIDNotExists = 'P2003'
    ErrBookmarkDoesNotExists = 'P2025'

    async get(userId: number): Promise<Bookmark[]> {
        return this.prisma.bookmark.findMany({
            where: {
                userId: userId,
            },
        })
    }

    async getById(id: number): Promise<Bookmark> {
        return this.prisma.bookmark.findUnique({ where: { id: id } })
    }

    async create(dto: BookmarkCreateDto): Promise<Bookmark> {
        try {
            return await this.prisma.bookmark.create({
                data: dto,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === this.ErrUserIDNotExists) {
                    throw new UnprocessableEntityException(
                        'User wit given id does not exist'
                    )
                }
            }

            throw error
        }
    }

    async update(id: number, dto: BookmarkUpdateDto): Promise<Bookmark> {
        console.log(typeof id)

        try {
            return await this.prisma.bookmark.update({
                data: dto,
                where: {
                    id: id,
                },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === this.ErrUserIDNotExists) {
                    throw new UnprocessableEntityException(
                        'User wit given id does not exist'
                    )
                }
            }

            throw error
        }
    }

    async delete(id: number): Promise<Bookmark> {
        try {
            await this.prisma.bookmark.delete({
                where: {
                    id: id,
                },
            })

            return null
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === this.ErrBookmarkDoesNotExists) {
                    throw new UnprocessableEntityException(
                        'Bookmark wit given id does not exist'
                    )
                }
            }

            throw error
        }
    }
}
