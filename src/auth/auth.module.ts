import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService],
    imports: [JwtModule.register({}), UserModule],
})
export class AuthModule {}
