import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    default: 'linh@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: '12345678',
    type: String,
  })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: 'Linh',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    default: 'Nguyen',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
}
