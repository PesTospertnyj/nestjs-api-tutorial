import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { BookmarkService } from './bookmark.service'
import { BookmarkCreateDto, BookmarkUpdateDto } from './dto'
import { CheckNullBodyPipe } from '../pipes/bookmark-update.pipe'

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}
    @Get()
    async get() {
        return await this.bookmarkService.get()
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.getById(id)
    }

    @Post()
    async create(@Body() dto: BookmarkCreateDto) {
        return this.bookmarkService.create(dto)
    }

    @UsePipes(CheckNullBodyPipe)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: BookmarkUpdateDto
    ) {
        return this.bookmarkService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.delete(id)
    }
}
