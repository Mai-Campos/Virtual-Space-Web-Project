import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/enums/role.enum';

@Injectable()
export class UserBootsrapService implements OnModuleInit {
  private readonly logger = new Logger(UserBootsrapService.name);
  constructor(private readonly repo: UserRepository) {}

  async onModuleInit() {
    await this.createAdminIfNoExist();
  }

  private async createAdminIfNoExist(): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@gmail.com';
    const adminName = process.env.ADMIN_NAME ?? 'Admin';
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin.1234';

    const existing = await this.repo.findByEmail(adminEmail);

    if (existing) {
      this.logger.log('Ya existe un usuario administrador');
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const adminId = await this.repo.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    await this.repo.assignRoles(adminId, [
      Role.ADMIN,
      Role.EMPLOYEE,
      Role.USER,
    ]);

    this.logger.log('Administrador creado correctamente');
  }
}
