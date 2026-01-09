import { Content } from 'src/content/model/content.model';

export class Movie extends Content {
  genreIds: number[];
  directorId: number;
}
