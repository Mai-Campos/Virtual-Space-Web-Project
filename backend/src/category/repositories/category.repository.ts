import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { Category } from '../models/category.model';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Category[]> {
    const result = await this.databaseService.query<Category>(
      'SELECT * FROM categories',
    );

    return result.rows;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const result = await this.databaseService.query<Category>(
      'INSERT INTO categories  ( name ) VALUES($1) RETURNING *',
      [dto.name],
    );

    return result.rows[0];
  }

  async update(dto: UpdateCategoryDto, id: number): Promise<Category | null> {
    const result = await this.databaseService.query<Category>(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [dto.name, id],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.databaseService.query<Category>(
      'DELETE FROM categories WHERE id = $1',
      [id],
    );

    return (result.rowCount ?? 0) > 0;
  }
}
