import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { Platform } from '../models/platform.entity';
import { CreatePlatformDto } from '../dtos/create-platform.dto';
import { UpdatePlatformDto } from '../dtos/update-platform.dto';

@Injectable()
export class PlatformRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Platform[]> {
    const result = await this.databaseService.query<Platform>(
      'SELECT * FROM platforms',
    );

    return result.rows;
  }

  async create(dto: CreatePlatformDto): Promise<Platform> {
    const result = await this.databaseService.query<Platform>(
      'INSERT INTO platforms (name) VALUES($1) RETURNING *',
      [dto.name],
    );

    return result.rows[0];
  }

  async update(dto: UpdatePlatformDto, id: number): Promise<Platform | null> {
    const result = await this.databaseService.query<Platform>(
      'UPDATE platforms SET name = $1 WHERE id = $2 RETURNING *',
      [dto.name, id],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.query<Platform>(
      'DELETE FROM platforms WHERE id = $1',
      [id],
    );

    return (result.rowCount ?? 0) > 0;
  }
}
