import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UserController } from './controller/user.controller';
import { GetUsersHandler } from './query/handlers/get-users.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [CreateUserHandler, GetUsersHandler],
  exports: [TypeOrmModule],
})
export class UserModule {}
