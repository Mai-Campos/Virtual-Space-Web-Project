import { CompleteContentDto } from 'src/content/common/dtos/complete-content.dto';

export class CompleteSerieDto extends CompleteContentDto {
  seasons: number;
  platform: {
    id: number;
    name: string;
  };

  genres: {
    id: number;
    name: string;
  }[];
}
