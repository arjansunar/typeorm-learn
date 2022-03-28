import { IsNotEmpty, IsInt } from 'class-validator';
export class DogDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
