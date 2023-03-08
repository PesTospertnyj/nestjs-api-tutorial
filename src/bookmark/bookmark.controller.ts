import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { BookmarkService } from './bookmark.service'
import { BookmarkCreateDto, BookmarkUpdateDto } from './dto'
import { CheckNullBodyPipe } from '../pipes/bookmark-update.pipe'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { BookmarkDto } from './dto/bookmark.dto'

@ApiTags('bookmarks')
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @ApiOkResponse({
        description: 'Returns all bookmarks.',
        type: BookmarkDto,
        isArray: true,
    })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Get()
    async get() {
        return await this.bookmarkService.get()
    }

    @ApiOkResponse({
        description: 'Returns bookmark by id.',
        type: BookmarkDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.getById(id)
    }

    @ApiCreatedResponse({
        description: 'Returns created bookmark.',
        type: BookmarkDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiUnprocessableEntityResponse({ description: 'UnprocessableEntity.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Post()
    async create(@Body() dto: BookmarkCreateDto) {
        return this.bookmarkService.create(dto)
    }

    @ApiOkResponse({
        description: 'Returns updated bookmark.',
        type: BookmarkDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiUnprocessableEntityResponse({ description: 'UnprocessableEntity.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @UsePipes(CheckNullBodyPipe)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: BookmarkUpdateDto
    ) {
        return this.bookmarkService.update(id, dto)
    }

    @ApiOkResponse({
        description: 'Deletes bookmark by id.',
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiUnprocessableEntityResponse({ description: 'UnprocessableEntity.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.delete(id)
    }
}
