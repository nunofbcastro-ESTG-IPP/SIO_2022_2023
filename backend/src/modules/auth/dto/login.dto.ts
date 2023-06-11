import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsGoodPassword } from '@/common/decorators/is-good-password.decorator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsGoodPassword()
  password: string;
}
