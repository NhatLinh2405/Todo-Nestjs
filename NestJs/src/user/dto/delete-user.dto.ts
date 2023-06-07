import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    default: '0beac7bd-6cb6-4c2e-a505-756166738529',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
