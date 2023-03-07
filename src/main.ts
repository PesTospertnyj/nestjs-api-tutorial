import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerMiddleware } from './logger.middleware'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    })
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    await app.listen(3000)
}
bootstrap()
