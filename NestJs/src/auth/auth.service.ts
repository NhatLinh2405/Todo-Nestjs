import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypr';
import { handleResponse } from 'src/utils/handleRes';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';

interface IUserPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<AuthDto> {
    const { firstName, lastName, email, password } = createAuthDto;

    try {
      const isExist = await this._userService.findUserByEmail(email);
      if (isExist) {
        return handleResponse({
          error: 'Email already exist',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const user = await this._userService.saveUser({
        firstName,
        lastName,
        email,
        password: await hashPassword(password),
      });

      const token = await this.signToken({
        id: user.id,
        name: this.covertFullName(user.firstName, user.lastName),
        email: user.email,
        role: user.role,
      });

      return handleResponse({
        message: 'Register successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async signIn(signIn: SignInDto): Promise<AuthDto> {
    const { email, password } = signIn;
    try {
      const user = await this._userService.findUserByEmail(email);
      if (!user) {
        return handleResponse({
          error: 'User not found',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword) {
        return handleResponse({
          error: 'Password is incorrect',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const token = await this.signToken({
        id: user.id,
        name: this.covertFullName(user.firstName, user.lastName),
        email: user.email,
        role: user.role,
      });

      return handleResponse({
        message: 'Login successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async signToken(userPayload: IUserPayload): Promise<string> {
    return this._jwtService.signAsync(userPayload, {
      secret: 'secret',
      expiresIn: '1d',
    });
  }

  covertFullName(firstName: string, lastName): string {
    return `${firstName} ${lastName}`;
  }
}
