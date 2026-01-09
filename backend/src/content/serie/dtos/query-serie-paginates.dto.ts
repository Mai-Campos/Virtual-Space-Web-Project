import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { QueryBasePaginatedDto } from 'src/content/common/dtos/query-base-paginated.dto';

export class QuerySeriePaginatedDto extends QueryBasePaginatedDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  genres?: number[];
}
