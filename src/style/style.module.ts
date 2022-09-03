import { Module } from '@nestjs/common'
import { StyleFileModule } from 'src/style-file/style-file.module'
import { StyleController } from './style.controller'
import { StyleService } from './style.service'

@Module({
  controllers: [StyleController],
  providers: [StyleService],
  imports: [StyleFileModule]
})
export class StyleModule {}
