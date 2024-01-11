import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
