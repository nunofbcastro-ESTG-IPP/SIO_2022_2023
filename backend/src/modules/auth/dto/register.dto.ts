import { PartialType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Match } from '@/common/decorators/match.decorator';

export class RegisterDto extends PartialType(LoginDto) {
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
