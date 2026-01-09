import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  coverImg: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  sizeGb: number;
}
