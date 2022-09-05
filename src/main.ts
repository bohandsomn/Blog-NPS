import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import * as cookieParser from 'cookie-parser'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT

  const app = await NestFactory.create<NestFastifyApplication>(AppModule)

  // const config = new DocumentBuilder()
  //   .setTitle('Blog docs')
  //   .setDescription('The blog API documentation')
  //   .setVersion('1.0')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  app.useGlobalFilters(new I18nValidationExceptionFilter())
  await app.listen(PORT, () => console.log(`Server run on port = ${PORT}`))
}
bootstrap()
