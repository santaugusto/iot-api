import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { GetUsersQuery } from '../query/get-users.query';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<{ id: string; email: string; name: string }> {
    const user: User = await this.commandBus.execute(
      new CreateUserCommand(dto.email, dto.password, dto.name),
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? '',
    };
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery('', undefined));
  }
}
