import { Module } from '@nestjs/common';
import { VideogameService } from '../services/videogame.service';
import { VideogameRepository } from '../repositories/videogame.repository';
import { VideoGameController } from '../controllers/videogame.controller';

@Module({
  providers: [VideogameService, VideogameRepository],
  controllers: [VideoGameController],
})
export class VideogameModule {}
