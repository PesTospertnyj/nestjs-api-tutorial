import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from 'src/auth/dto'

describe('App e2e', () => {
    let app: INestApplication
    let prisma: PrismaService
    const baseUrl = 'http://localhost:3333'
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        )

        await app.init()
        await app.listen(3333)

        prisma = app.get(PrismaService)

        await prisma.cleanDb()
        pactum.request.setBaseUrl(baseUrl)
    })

    afterAll(() => {
        app.close()
    })

    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'example@gmail.com',
            password: 'someultrapass',
        }
        describe('Signup', () => {
            it('should throw if email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        password: 'somepassword',
                    })
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should throw if password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        email: 'example@gmail.com',
                    })
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should throw if body is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should signup', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(HttpStatus.CREATED)
            })
        })

        describe('Signin', () => {
            it('should throw if email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        password: 'somepassword',
                    })
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should throw if password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: 'example@gmail.com',
                    })
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should throw if body is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .expectStatus(HttpStatus.BAD_REQUEST)
            })
            it('should signin', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(HttpStatus.OK)
                    .stores('user_access_token', 'access_token')
            })
        })
    })
    describe('Users', () => {
        describe('Get me', () => {
            it('should get current user', () => {
                return pactum
                    .spec()
                    .get('/users/me')
                    .withHeaders("Authorization", 'Bearer $S{user_access_token}')
                    .expectStatus(HttpStatus.OK)
            })
        })
        describe('update', () => {})
    })
    describe('Bookmarks', () => {
        describe('create', () => {})
        describe('get', () => {})
        describe('get_by_id', () => {})
        describe('update', () => {})
        describe('delete', () => {})
    })
})
