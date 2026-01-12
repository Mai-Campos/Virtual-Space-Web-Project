import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserWithRolesDto } from '../dto/user-with-roles.dto';
import { User } from '../models/user.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/enums/role.enum';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(dto: CreateUserDto): Promise<number> {
    // Comprobar si no existe un usuario con el email
    const existing = await this.repo.findByEmail(dto.email);

    if (existing) throw new ConflictException('Email already in use');

    // Hashear password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const userId = await this.repo.create({
      ...dto,
      password: hashedPassword,
    });

    // Asignamos roles de usuario y empleado
    await this.repo.assignRoles(userId, [Role.EMPLOYEE, Role.USER]);

    return userId;
  }

  async findEmployees(): Promise<UserWithRolesDto[]> {
    return this.repo.getAllEmployees();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findByEmail(email);

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async update(dto: UpdateEmployeeDto, id: number): Promise<void> {
    const updated = await this.repo.updateEmployee(dto, id);

    if (!updated) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const hasUserData = dto.name !== undefined || dto.email !== undefined;

    const hasRoles = dto.roleNames && dto.roleNames.length > 0;

    if (!hasUserData && !hasRoles)
      throw new BadRequestException(`Nothing was updated`);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repo.deleteEmployee(id);

    if (!deleted) throw new NotFoundException(`User with id: ${id} not found`);
  }
}
