import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { CreateContentDto } from 'src/content/common/dtos/create-content.dto';

export class CreateSerieDto extends CreateContentDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  seasons: number;

  @IsInt()
  @IsNotEmpty()
  platformId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
