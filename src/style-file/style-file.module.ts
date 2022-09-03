import { Module } from '@nestjs/common'
import { StyleFileService } from './style-file.service'

@Module({
  providers: [StyleFileService],
  exports: [StyleFileService]
})
export class StyleFileModule {}
