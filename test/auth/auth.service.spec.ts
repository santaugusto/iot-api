import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
describe('AuthService', () => {
  let service: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token123'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return user data without password when credentials are valid', async () => {
    const user = {
      id: '1',
      email: 'test@mail.com',
      password: await bcrypt.hash('123456', 10),
    };
    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await service.validateUser('test@mail.com', '123456');
    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  it('should return null if user is not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    const result = await service.validateUser('notfound@mail.com', '123456');
    expect(result).toBeNull();
  });
  it('login should return an access token', () => {
    const user = { id: '1', email: 'test@mail.com' };
    const result = service.login(user);
    expect(result).toHaveProperty('access_token', 'token123');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
    });
  });
});
