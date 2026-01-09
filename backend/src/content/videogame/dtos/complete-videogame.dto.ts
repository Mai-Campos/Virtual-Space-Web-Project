import { CompleteContentDto } from 'src/content/common/dtos/complete-content.dto';

export class CompleteVideogameDto extends CompleteContentDto {
  categories: {
    id: number;
    name: string;
  }[];
}
