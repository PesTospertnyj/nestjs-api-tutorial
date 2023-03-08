import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './logger.middleware'
import { AuthController } from './auth/auth.controller'
import { CacheModule } from './cache/cache.module'

@Module({
    imports: [
        UserModule,
        AuthModule,
        BookmarkModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
