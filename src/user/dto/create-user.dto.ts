// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;
}
