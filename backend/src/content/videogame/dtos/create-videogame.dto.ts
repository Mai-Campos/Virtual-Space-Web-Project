import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';
import { CreateContentDto } from 'src/content/common/dtos/create-content.dto';

export class CreateVideogameDto extends CreateContentDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
