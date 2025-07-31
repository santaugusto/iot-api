import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
