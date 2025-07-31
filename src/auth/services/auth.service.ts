import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const result = { ...user };
    return result;
  }

  login(user: Omit<User, 'password'>) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
