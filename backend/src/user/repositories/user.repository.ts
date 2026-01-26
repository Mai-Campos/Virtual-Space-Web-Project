import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { UserAuth } from '../types/user-auth.type';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { UserWithRolesDto } from '../dto/user-with-roles.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateUserDto): Promise<number> {
    const result = await this.databaseService.query<{ id: number }>(
      'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING id',
      [dto.name, dto.email, dto.password],
    );

    return result.rows[0].id;
  }

  async assignRoles(userId: number, roles: string[]): Promise<void> {
    const result = await this.databaseService.query<{ id: number }>(
      'SELECT id FROM roles WHERE name = ANY($1)',
      [roles],
    );

    for (const role of result.rows) {
      await this.databaseService.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
        [userId, role.id],
      );
    }
  }

  async findByEmail(email: string): Promise<UserAuth | null> {
    const result = await this.databaseService.query<UserAuth>(
      `
    SELECT
      u.id,
      u.name,
      u.email,
      u.password,
      ARRAY_AGG(r.name) AS roles
    FROM users u
    JOIN user_roles ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE u.email = $1
    GROUP BY u.id
    `,
      [email],
    );

    return result.rows[0] ?? null;
  }

  async getAllEmployees(): Promise<UserWithRolesDto[]> {
    const result = await this.databaseService.query<UserWithRolesDto>(
      `
    SELECT
      u.id,
      u.name,
      u.email,
      ARRAY_AGG(r.name) AS roles
    FROM users u
    JOIN user_roles ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE EXISTS (
      SELECT 1
      FROM user_roles ur2
      JOIN roles r2 ON r2.id = ur2.role_id
      WHERE ur2.user_id = u.id
      AND r2.name = 'employee'
    )
  GROUP BY u.id
  ORDER BY u.id DESC`,
    );

    return result.rows;
  }

  async updateEmployee(dto: UpdateEmployeeDto, id: number): Promise<boolean> {
    const result = await this.databaseService.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email)
      WHERE id = $3`,
      [dto.name ?? null, dto.email ?? null, id],
    );

    if ((result.rowCount ?? 0) === 0) return false;

    return true;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await this.databaseService.query(
      `DELETE FROM user_roles WHERE user_id = $1`,
      [id],
    );

    const result = await this.databaseService.query(
      `DELETE FROM users WHERE id = $1`,
      [id],
    );

    return (result.rowCount ?? 0) > 0;
  }
}
