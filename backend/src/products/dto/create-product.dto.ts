import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  desc: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @ArrayMinSize(1, {
    message: 'images should be an array with at least one item',
  })
  @ValidateNested({ each: true })
  images: { url: string }[];

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  colorIds: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  sizeIds: string[];
}
