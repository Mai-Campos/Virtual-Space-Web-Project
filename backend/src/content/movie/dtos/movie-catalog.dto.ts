import { BaseCatalogDto } from 'src/content/common/dtos/base-catalog.dto';

export class MovieCatalogDto extends BaseCatalogDto {
  genres: string[];
}
