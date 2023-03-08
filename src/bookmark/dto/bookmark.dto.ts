import { ApiProperty } from '@nestjs/swagger'

export class BookmarkDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    description?: string
    @ApiProperty()
    link: string
    @ApiProperty()
    userId: number
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updatedAt: Date
}
