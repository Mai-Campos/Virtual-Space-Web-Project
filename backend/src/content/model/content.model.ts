import { ContentType } from '../enums/content_type.enum';

export abstract class Content {
  id: number;
  title: string;
  synopsis: string;
  coverImg: string;
  sizeGb: number;
  type: ContentType;
}
