import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PusherController } from './pusher/pusher.controller';
import { PusherService } from './pusher/pusher.service';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './user/user.module';

const entities = [];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        // entities: [...entities],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // logging: true,
      }),
    }),
    UserModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController, PusherController],
  providers: [AppService, PusherService],
})
export class AppModule {}
