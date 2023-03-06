import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL' || 'postgresql://postgres:postgres@localhost:5432/nest?schema=public')
                },
            }
        });
    }

    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ])
    }
}
