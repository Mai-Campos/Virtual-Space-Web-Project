import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class QueryAdminPaginatedDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 6;
}
