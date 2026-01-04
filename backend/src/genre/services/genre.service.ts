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

    if (!updated) throw new NotFoundException(`Genre with id: ${id} not found`);

    return updated;
  }

  async delete(id: number) {
    try {
      const deleted = await this.repo.delete(id);
      if (!deleted)
        throw new NotFoundException(`Director with id: ${id} not found`);
    } catch (error) {
      const pgError = error as { code?: string };
      if (pgError.code === '23503') {
        throw new ConflictException(
          `Cannot delete director with id: ${id} because it is referenced by other records`,
        );
      }

      throw error;
    }
  }
}
