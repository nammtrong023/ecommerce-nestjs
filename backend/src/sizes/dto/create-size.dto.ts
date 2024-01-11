import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
