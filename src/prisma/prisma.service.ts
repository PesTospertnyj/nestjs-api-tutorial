import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get(
                        'DATABASE_URL' ||
                            'postgresql://postgres:postgres@localhost:5432/nest?schema=public'
                    ),
                },
            },
        })
    }

    async onModuleInit() {
        await this.$connect()
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }

    cleanDb() {
        return this.$executeRaw`truncate users restart identity cascade`
    }
}
