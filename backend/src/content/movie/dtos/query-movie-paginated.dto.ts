import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { QueryBasePaginatedDto } from 'src/content/common/dtos/query-base-paginated.dto';

export class QueryMoviePaginatedDto extends QueryBasePaginatedDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(Number);
    }

    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }

    return [];
  })
  @IsArray()
  @IsInt({ each: true })
  genres?: number[];
}
