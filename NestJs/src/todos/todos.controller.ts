import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard, UserRole } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteDto } from './dto/delete-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(@Body() createTodoDto: CreateTodoDto, @User() user) {
    return await this.todosService.addTodo(createTodoDto, user.id);
  }

  @Get('/')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  async findAllTodoByAdmin() {
    return await this.todosService.findAllTodoByAdmin();
  }

  @Get('/completed')
  @UseGuards(AuthenticationGuard)
  async findAllTodoCompleteByUser(@User() user) {
    return await this.todosService.findAllTodoCompleteByUser(user.id);
  }

  @Get('/not-completed')
  @UseGuards(AuthenticationGuard)
  async findAllTodoNotCompleteByUser(@User() user) {
    return await this.todosService.findAllTodoNotCompleteByUser(user.id);
  }

  @Patch('')
  @UseGuards(AuthenticationGuard)
  async update(@User() user, @Body() todo: DeleteDto) {
    return await this.todosService.update(user.id, todo.id);
  }

  @Delete('')
  @UseGuards(AuthenticationGuard)
  async deleteTodo(@User() user, @Body() todo: DeleteDto) {
    return await this.todosService.deleteTodo(user.id, todo.id);
  }
}
