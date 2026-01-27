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
      throw new NotFoundException(`Director con id: ${id} no encontrado`);

    return updated;
  }

  async delete(id: number): Promise<void> {
    try {
      const deleted = await this.repo.delete(id);

      if (!deleted)
        throw new NotFoundException(`Director con id: ${id} no encontrado`);
    } catch (error) {
      const pgError = error as { code?: string };
      if (pgError.code === '23503') {
        throw new ConflictException(
          `No se puede eliminar el director con id: ${id} porque está siendo referenciado por otro registro`,
        );
      }

      throw error;
    }
  }
}
