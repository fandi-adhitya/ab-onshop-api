import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

  @IsString()
  category : string

}