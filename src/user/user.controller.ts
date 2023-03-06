import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Put,
    Req,
    UseGuards,
    UsePipes,
} from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { User } from '@prisma/client'
import { UpdateUserDto } from './dto'
import { CheckNullBodyPipe } from '../pipes/bookmark-update.pipe'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @UsePipes(CheckNullBodyPipe)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto)
    }
}
