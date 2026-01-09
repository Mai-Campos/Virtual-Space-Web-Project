import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateSerieDto extends PartialType(CreateSerieDto) {
  @IsOptional()
  @IsInt()
  @Min(1)
  seasons?: number;
}
