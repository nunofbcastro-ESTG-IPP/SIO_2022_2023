import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma.service';
import { PasswordService } from '@/common/services/password/password.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from '@/common/interfaces/JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  private async generateToken(user: User): Promise<Auth> {
    const jwtPayload: JwtPayload = {
      id: user.id,
    };
    const expiresIn =
      new Date().getTime() +
      Number(process.env.JWT_EXPIRE_TIME_IN_DAYS) /*Days*/ *
        24 /*Hours*/ *
        60 /*Minutes*/ *
        60 /*Seconds*/ *
        1000; /*Milliseconds*/

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
      expiresIn: expiresIn,
    };
  }

  private async findUser(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { email: email },
    });
  }

  private async verifyCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    //verify if user exists
    if (!user) {
      return false;
    }

    //verify if password is valid
    if (
      !(await this.passwordService.comparePassword(password, user.password))
    ) {
      return false;
    }

    return true;
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const user: User = await this.findUser(loginDto.email);

    if (this.verifyCredentials(user, loginDto.password)) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return await this.generateToken(user);
  }

  async register(registerDto: RegisterDto): Promise<Auth> {
    let user: User = await this.findUser(registerDto.email);

    if (user) {
      throw new ConflictException('User already registered');
    }

    const encryptedPassword = await this.passwordService.hashPassword(
      registerDto.password,
    );

    user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: encryptedPassword,
      },
    });

    return await this.generateToken(user);
  }
}
