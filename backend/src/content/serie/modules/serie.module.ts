import { Module } from '@nestjs/common';
import { SerieRepository } from '../repositories/serie.repository';
import { SerieService } from '../services/serie.service';
import { SerieController } from '../controllers/serie.controller';

@Module({
  providers: [SerieRepository, SerieService],
  controllers: [SerieController],
})
export class SerieModule {}
