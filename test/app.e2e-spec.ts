import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from 'src/auth/dto'
import { BookmarkCreateDto, BookmarkUpdateDto } from 'src/bookmark/dto'
import { UpdateUserDto as UserUpdateDto } from 'src/user/dto'

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
            password: 'Someultrapass1!_sdfasd',
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
            it('should throw if password is not strong enough', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: 'example@gmail.com',
                        password: 'weakpassword',
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
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
                    .expectStatus(HttpStatus.OK)
                    .stores('uder_id', 'id')
            })
        })
        describe('update', () => {
            const dto: UserUpdateDto = {
               firstName: 'John',
               lastName: 'Doe'
            }
            it('should throw if id is empty', () => {
                return pactum
                    .spec()
                    .patch('/users/{id}')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withBody({
                        title: 'some title',
                    })
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should throw if body is empty', () => {
                return pactum
                    .spec()
                    .patch('/users/{id}')
                    .withPathParams('id', '$S{uder_id}')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should update', () => {
                return pactum
                    .spec()
                    .patch('/users/{id}')
                    .withBody(dto)
                    .withPathParams('id', '$S{uder_id}')
                    .expectStatus(HttpStatus.OK)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
        })
    })
    describe('Bookmarks', () => {
        describe('create', () => {
            const dto: BookmarkCreateDto = {
                userId: 1,
                title: 'another title',
                description: 'another description',
                link: 'https://someotherurl.com',
            }
            it('should throw if id is empty', () => {
                return pactum
                    .spec()
                    .post('/bookmarks')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withBody({
                        title: 'some title',
                    })
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should throw if body is empty', () => {
                return pactum
                    .spec()
                    .post('/bookmarks')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should create', () => {
                return pactum
                    .spec()
                    .post('/bookmarks')
                    .withBody(dto)
                    .expectStatus(HttpStatus.CREATED)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
                    .stores('bookmark_id', 'id')
            })
        })
        describe('get', () => {
            it('should get all bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmarks')
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
                    .expectStatus(HttpStatus.OK)
            })
        })
        describe('get_by_id', () => {
            it('should get bookmark by id', () => {
                return pactum
                    .spec()
                    .get('/bookmarks/{id}')
                    .withPathParams('id', '$S{bookmark_id}')
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
                    .expectStatus(HttpStatus.OK)
            })
        })
        describe('update', () => {
            const dto: BookmarkUpdateDto = {
                title: 'another modified title',
                description: 'another modified description',
                link: 'https://some.modified.url.com',
            }
            it('should throw if id is empty', () => {
                return pactum
                    .spec()
                    .patch('/bookmarks/{id}')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withBody({
                        title: 'some title',
                    })
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should throw if body is empty', () => {
                return pactum
                    .spec()
                    .patch('/bookmarks/{id}')
                    .withPathParams('id', '$S{bookmark_id}')
                    .expectStatus(HttpStatus.BAD_REQUEST)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
            it('should update', () => {
                return pactum
                    .spec()
                    .patch('/bookmarks/{id}')
                    .withBody(dto)
                    .withPathParams('id', '$S{bookmark_id}')
                    .expectStatus(HttpStatus.OK)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
        })
        describe('delete', () => {
            it('should delete bookmark by id', () => {
                return pactum
                    .spec()
                    .delete('/bookmarks/{id}')
                    .withPathParams('id', '$S{bookmark_id}')
                    .expectStatus(HttpStatus.OK)
                    .withHeaders(
                        'Authorization',
                        'Bearer $S{user_access_token}'
                    )
            })
        })
    })
})
