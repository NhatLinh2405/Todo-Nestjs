import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard, UserRole } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  findAll() {
    return this.userService.findAllUser();
  }

  @Delete('')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  remove(@Body() body: DeleteUserDto) {
    return this.userService.deleteUser(body.id);
  }

  @Get('/me')
  @UseGuards(AuthenticationGuard)
  getProfile(@User() user) {
    return this.userService.getProfile(user.id);
  }
}
