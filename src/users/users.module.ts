import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Userservice } from './users.service';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [Userservice],
  exports: [Userservice],
})
export class UsersModule {}
