import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersHandler } from 'src/user/query/handlers/get-users.handler';
import { GetUsersQuery } from 'src/user/query/get-users.query';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

describe('GetUsersHandler', () => {
  let handler: GetUsersHandler;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<User>;

  const mockUserRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersHandler,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile();

    handler = module.get<GetUsersHandler>(GetUsersHandler);
    repository = module.get<Repository<User>>('UserRepository');
  });

  it('should return an array of users', async () => {
    const users = [
      { id: '1', email: 'user1@mail.com', name: 'User One' },
      { id: '2', email: 'user2@mail.com', name: 'User Two' },
    ] as User[];

    mockUserRepository.find.mockResolvedValue(users);

    const result = await handler.execute(new GetUsersQuery('', undefined));

    expect(result).toBe(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });
});
