import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';
import { GenreRepository } from '../repositories/genre.repository';
import { Genre } from '../models/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly repo: GenreRepository) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.repo.create(createGenreDto);
  }

  async findAll(): Promise<Genre[]> {
    return await this.repo.getAll();
  }

  async update(updateGenreDto: UpdateGenreDto, id: number): Promise<Genre> {
    const updated = await this.repo.update(updateGenreDto, id);

    if (!updated)
      throw new NotFoundException(`Género con id: ${id} no encontrado`);

    return updated;
  }

  async delete(id: number) {
    try {
      const deleted = await this.repo.delete(id);
      if (!deleted)
        throw new NotFoundException(`G;énero con id: ${id} no encontrado`);
    } catch (error) {
      const pgError = error as { code?: string };
      if (pgError.code === '23503') {
        throw new ConflictException(
          `No se puede eliminar el género con id: ${id} porque está siendo referenciado por otro registro`,
        );
      }

      throw error;
    }
  }
}
