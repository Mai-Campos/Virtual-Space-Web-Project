import { PartialType } from '@nestjs/mapped-types';
import { CreateVideogameDto } from './create-videogame.dto';

export class UpdateVideoGameDto extends PartialType(CreateVideogameDto) {}
