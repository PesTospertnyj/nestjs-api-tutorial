import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP')
    use(req: Request, res: Response, next: Function) {
        // this.logger.log(`Logging HTTP request ${req.method} ${req.baseUrl} ${res.statusCode}`,);
        const { ip, method, baseUrl: url } = req
        const userAgent = req.get('user-agent') || ''

        res.on('close', () => {
            const { statusCode } = res
            const contentLength = res.get('content-length')

            this.logger.log(
                `${method} ${url}  ${statusCode} ${contentLength} - ${userAgent} ${ip}`
            )
        })
        next()
    }
}
