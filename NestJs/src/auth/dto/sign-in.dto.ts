import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
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
}
