import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'
import { UpdateUserDto } from './dto'
import { CheckNullBodyPipe } from '../pipes/bookmark-update.pipe'
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger'
import { UserDto } from './dto/user.dto'

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOkResponse({
        description: 'Returns current logged in user.',
        type: UserDto,
        isArray: false,
    })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @ApiOkResponse({
        description: 'User updated.',
        type: UserDto,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'BadRequest.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiInternalServerErrorResponse({ description: 'InternalServerError.' })
    @UsePipes(CheckNullBodyPipe)
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto
    ) {
        return await this.userService.update(id, dto)
    }
}
