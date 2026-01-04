import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
