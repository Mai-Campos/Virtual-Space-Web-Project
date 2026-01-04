import { Module } from '@nestjs/common';
import { PlatformService } from '../services/platform.service';
import { PlatformController } from '../controllers/platform.controller';
import { PlatformRepository } from '../repositories/platform.respository';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService, PlatformRepository],
})
export class PlatformModule {}
