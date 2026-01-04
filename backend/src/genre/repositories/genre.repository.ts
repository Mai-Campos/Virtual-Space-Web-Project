import { DatabaseService } from 'src/database/services/database.service';
import { Genre } from '../models/genre.entity';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Genre[]> {
    const result = await this.databaseService.query<Genre>(
      'SELECT * FROM genres',
    );

    return result.rows;
  }

  async create(dto: CreateGenreDto): Promise<Genre> {
    const result = await this.databaseService.query<Genre>(
      'INSERT INTO genres (name) VALUES($1) RETURNING *',
      [dto.name],
    );

    return result.rows[0];
  }

  async update(dto: UpdateGenreDto, id: number): Promise<Genre | null> {
    const result = await this.databaseService.query<Genre>(
      'UPDATE genres SET name = $1 WHERE id = $2 RETURNING *',
      [dto.name, id],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.query<Genre>(
      'DELETE FROM genres WHERE id = $1',
      [id],
    );

    return (result.rowCount ?? 0) > 0;
  }
}
