import { NestFactory } from '@nestjs/core'
import fastifyCookie from '@fastify/cookie'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  // const config = new DocumentBuilder()
  //   .setTitle('Blog docs')
  //   .setDescription('The blog API documentation')
  //   .setVersion('1.0')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('api', app, document)

  await app.register(fastifyCookie as any, {
    secret: process.env.COOKIE_SECRET
  })
  await app.listen(PORT, () => console.log(`Server run on port = ${PORT}`))
}
bootstrap()
