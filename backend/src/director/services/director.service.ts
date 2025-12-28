import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectorDto } from '../dtos/create-director.dto';
import { UpdateDirectorDto } from '../dtos/update-director.dto';
import { Director } from '../models/director.model';
import { DirectorRepository } from '../repositories/director.repository';

@Injectable()
export class DirectorService {
  constructor(private readonly repo: DirectorRepository) {}

  async create(createDirectorDto: CreateDirectorDto): Promise<Director> {
    return await this.repo.create(createDirectorDto);
  }

  async findAll(): Promise<Director[]> {
    return await this.repo.getAll();
  }

  async update(
    updateDirectorDto: UpdateDirectorDto,
    id: number,
  ): Promise<Director> {
    const updated = await this.repo.update(updateDirectorDto, id);

    if (!updated)
      throw new NotFoundException(`Director with id: ${id} not found`);

    return updated;
  }

  async delete(id: number): Promise<void> {
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
