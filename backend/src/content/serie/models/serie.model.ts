import { Content } from 'src/content/model/content.model';
import { Genre } from 'src/genre/models/genre.entity';
import { Platform } from 'src/platform/models/platform.entity';

export class Serie extends Content {
  genres: Genre[];
  platform: Platform;
}
