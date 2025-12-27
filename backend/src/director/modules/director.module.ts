import { Module } from '@nestjs/common';
import { DirectorController } from '../controllers/director.controller';
import { DirectorService } from '../services/director.service';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
