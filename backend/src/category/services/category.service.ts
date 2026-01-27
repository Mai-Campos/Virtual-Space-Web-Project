import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.repo.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.repo.getAll();
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
    id: number,
  ): Promise<Category> {
    const updatedCategory = await this.repo.update(updateCategoryDto, id);

    if (!updatedCategory)
      throw new NotFoundException(`Categoría con id: ${id} no encontrada`);

    return updatedCategory;
  }

  async delete(id: number): Promise<void> {
    try {
      const deleted = await this.repo.delete(id);

      if (!deleted) {
        throw new NotFoundException(`Categoría con id: ${id} no encontrada`);
      }
    } catch (error: any) {
      const pgError = error as { code?: string };
      if (pgError.code === '23503') {
        throw new ConflictException(
          `No se puede eliminar la categoría con id: ${id} porque está siendo referenciada por otro registro`,
        );
      }

      throw error;
    }
  }
}
