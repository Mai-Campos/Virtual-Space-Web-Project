import { DatabaseService } from 'src/database/services/database.service';
import { Director } from '../models/director.model';
import { CreateDirectorDto } from '../dtos/create-director.dto';
import { UpdateDirectorDto } from '../dtos/update-director.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectorRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Director[]> {
    const result = await this.databaseService.query<Director>(
      'SELECT * FROM directors',
    );

    return result.rows;
  }

  async create(dto: CreateDirectorDto): Promise<Director> {
    const result = await this.databaseService.query<Director>(
      'INSERT INTO directors (name) VALUES($1) RETURNING *',
      [dto.name],
    );

    return result.rows[0];
  }

  async update(dto: UpdateDirectorDto, id: number): Promise<Director | null> {
    const result = await this.databaseService.query<Director>(
      'UPDATE directors SET name = $1 WHERE id = $2 RETURNING * ',
      [dto.name, id],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.query<Director>(
      'DELETE FROM directors WHERE id = $1',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}
