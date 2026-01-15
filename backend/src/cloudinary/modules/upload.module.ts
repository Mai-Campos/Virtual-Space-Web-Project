import { Module } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { UploadController } from '../controllers/upload.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
  imports: [ConfigModule],
})
export class UploadModule {}
