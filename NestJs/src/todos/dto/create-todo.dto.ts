import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    default: 'Learn NestJS',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
