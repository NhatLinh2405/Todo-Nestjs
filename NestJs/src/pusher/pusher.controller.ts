import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PusherService } from './pusher.service';

@ApiTags('Pusher')
@ApiBearerAuth()
@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Post('message')
  async message(
    @Body('username') username: string,
    @Body('message') message: string,
  ) {
    await this.pusherService.trigger('chat', 'message', {
      username,
      message,
    });
  }
}
