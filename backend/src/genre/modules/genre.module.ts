import { Module } from '@nestjs/common';
import { GenreController } from '../controllers/genre.controller';
import { GenreService } from '../services/genre.service';
import { GenreRepository } from '../repositories/genre.repository';

@Module({
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
