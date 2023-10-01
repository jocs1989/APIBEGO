import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { toLowerCase } from './trasforms/singnup.trasform';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ description: 'This email', example: 'corro@dominio.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'This field is password', example: 'password' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
