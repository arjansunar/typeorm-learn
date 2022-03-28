import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
export class DogDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name for a dog' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number, description: 'id of the owner' })
  userId: number;
}
