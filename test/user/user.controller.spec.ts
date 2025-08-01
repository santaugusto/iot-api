import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/user/controller/user.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('UserController', () => {
  let controller: UserController;

  const mockCommandBus = { execute: jest.fn() };
  const mockQueryBus = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return an array of users', async () => {
    const users = [{ id: '1', email: 'test@mail.com', name: 'Test' }];
    mockQueryBus.execute.mockResolvedValue(users);

    const result = await controller.findAll();
    expect(result).toEqual(users);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });
});
