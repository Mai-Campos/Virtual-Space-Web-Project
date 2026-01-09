import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateContentDto } from 'src/content/common/dtos/create-content.dto';

export class CreateMovieDto extends CreateContentDto {
  @IsNumber()
  @IsNotEmpty()
  directorId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
