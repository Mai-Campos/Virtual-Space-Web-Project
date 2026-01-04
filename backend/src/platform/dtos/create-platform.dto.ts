import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePlatformDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
