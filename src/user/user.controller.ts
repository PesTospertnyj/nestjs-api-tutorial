import { Controller, Get, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch(':id')
    update(@GetUser() user: User) {
        return user
    }
}
