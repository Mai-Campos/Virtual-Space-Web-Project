import { CompleteContentDto } from 'src/content/common/dtos/complete-content.dto';

export class CompleteMovieDto extends CompleteContentDto {
  director: {
    id: number;
    name: string;
  };

  genres: {
    id: number;
    name: string;
  }[];
}
