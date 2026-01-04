import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlatformDto } from '../dtos/create-platform.dto';
import { UpdatePlatformDto } from '../dtos/update-platform.dto';
import { PlatformRepository } from '../repositories/platform.respository';
import { Platform } from '../models/platform.entity';

@Injectable()
export class PlatformService {
  constructor(private readonly repo: PlatformRepository) {}

  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    return await this.repo.create(createPlatformDto);
  }

  async findAll(): Promise<Platform[]> {
    return await this.repo.getAll();
  }

  async update(
    updatePlatformDto: UpdatePlatformDto,
    id: number,
  ): Promise<Platform> {
    const updated = await this.repo.update(updatePlatformDto, id);

    if (!updated)
      throw new NotFoundException(`Platform with id: ${id} not found`);

    return updated;
  }

  async delete(id: number): Promise<void> {
    try {
      const deleted = await this.repo.delete(id);

      if (!deleted)
        throw new NotFoundException(`Platform with id: ${id} not found`);
    } catch (error) {
      const pgError = error as { code?: string };
      if (pgError.code === '23503') {
        throw new ConflictException(
          `Cannot delete Platform with id: ${id} because it is referenced by other records`,
        );
      }

      throw error;
    }
  }
}
