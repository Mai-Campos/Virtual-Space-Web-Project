import { Module } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieController } from '../controllers/movie.controller';

@Module({
  providers: [MovieService, MovieRepository],
  controllers: [MovieController],
})
export class MovieModule {}
