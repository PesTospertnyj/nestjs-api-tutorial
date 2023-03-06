import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user
    }
}
