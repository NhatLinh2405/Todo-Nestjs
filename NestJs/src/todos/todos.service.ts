import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { handleResponse } from 'src/utils/handleRes';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

export interface IRes {
  message?: string;
  data?: any;
}
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoService: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async addTodo(createTodoDto: CreateTodoDto, userId: string): Promise<IRes> {
    const { title } = createTodoDto;

    try {
      const user = await this.userService.findUserById(userId);

      const newTodo = await this.todoService.create({
        title,
        user,
      });

      const todos = await this.todoService.save(newTodo);
      return handleResponse({
        message: `Todo created successfully`,
        data: { todos },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAllTodoByAdmin(): Promise<IRes> {
    try {
      const todos = await this.todoService.find();

      return handleResponse({
        message: `Get all todos by admin  successfully`,
        data: { todos },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAllTodoNotCompleteByUser(userId: string): Promise<IRes> {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const todos = await this.todoService.find({
        where: {
          user: { id: userId },
          complete: false,
        },
      });
      return handleResponse({
        message: `Get all todos not completed by user id: ${userId} successfully`,
        data: { todos },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAllTodoCompleteByUser(userId: string): Promise<IRes> {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const todos = await this.todoService.find({
        where: {
          user: { id: userId },
          complete: true,
        },
      });

      return handleResponse({
        message: `Get all todos completed by user id: ${userId} successfully`,
        data: { todos },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(userId: string, id: string): Promise<IRes> {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        return handleResponse({
          error: `User with id ${userId} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      const todo = await this.todoService.findOneOrFail({ where: { id } });
      todo.complete = true;
      const data = await this.todoService.save(todo);
      return handleResponse({
        message: `Todo with id ${id} has been updated`,
        data: { data },
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async deleteTodo(userId: string, id: string): Promise<IRes> {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        return handleResponse({
          error: `User with id ${userId} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      const todo = await this.todoService.findOne({ where: { id } });

      if (!todo) {
        return handleResponse({
          error: `Todo with id ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      // console.log('todo.user.id !== userId', todo.user);
      // console.log('todo.user.id !== userId', todo.user.id !== userId);
      // if (todo.user.id !== userId) {
      //   return handleResponse({
      //     error: `You are not authorized to delete this todo`,
      //     statusCode: HttpStatus.UNAUTHORIZED,
      //   });
      // }
      // console.log('id 4', id);

      await this.todoService.delete(id);
      return handleResponse({
        message: `Todo with id ${id} has been deleted`,
      });
    } catch (error) {
      return handleResponse({
        error: error.response?.error || error.message,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
