import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    })
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    const config = new DocumentBuilder()
        .setTitle('Nestjs Bookmark API')
        .setDescription('Nestjs Bookmark API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}

bootstrap()
