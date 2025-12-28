import { Module } from '@nestjs/common';
import { DirectorController } from '../controllers/director.controller';
import { DirectorService } from '../services/director.service';
import { DirectorRepository } from '../repositories/director.repository';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, DirectorRepository],
})
export class DirectorModule {}
