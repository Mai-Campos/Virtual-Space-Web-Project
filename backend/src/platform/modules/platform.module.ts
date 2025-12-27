import { Module } from '@nestjs/common';
import { PlatformService } from '../services/platform.service';
import { PlatformController } from '../controllers/platform.controller';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
