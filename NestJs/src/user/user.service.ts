import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRes } from 'src/todos/todos.service';
import { handleResponse } from 'src/utils/handleRes';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.create(createUser);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async saveUser(createUser: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.save(createUser);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAllUser(): Promise<IRes> {
    try {
      const users = await this.userService.find();
      return handleResponse({
        message: `Get all users successfully`,
        data: {
          users,
        },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.findUserById(id);
      if (!user) {
        return handleResponse({
          error: `User not found with id: ${id}`,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      await this.userService.delete(id);
      return handleResponse({
        message: `User deleted successfully`,
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userService.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User> {
    return await this.userService.findOne({ where: { id } });
  }

  async getProfile(userId: string): Promise<IRes> {
    try {
      const user = await this.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return handleResponse({
        message: `Get profile successfully`,
        data: {
          user,
        },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
