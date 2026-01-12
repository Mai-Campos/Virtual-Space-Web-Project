import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/enums/role.enum';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<number> {
    const existing = await this.repo.findByEmail(dto.email);

    if (existing) throw new ConflictException('Email  already in use');

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const userId = await this.repo.create({
      ...dto,
      password: hashedPassword,
    });

    await this.repo.assignRoles(userId, [Role.USER]);

    return userId;
  }

  async login(dto: LoginDto): Promise<{ accesToken: string }> {
    const user = await this.repo.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    return {
      accesToken: this.jwt.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
