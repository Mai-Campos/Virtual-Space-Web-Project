import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VideogameRepository } from '../repositories/videogame.repository';
import { CreateVideogameDto } from '../dtos/create-videogame.dto';
import { QueryVideogamePaginatedDto } from '../dtos/query-videogame-paginated.dto';
import { VideogameCatalogDto } from '../dtos/videogame-catalog.dto';
import { PaginatedResponseDto } from 'src/content/common/dtos/paginated-response.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { CompleteVideogameDto } from '../dtos/complete-videogame.dto';
import { UpdateVideoGameDto } from '../dtos/update-videogame.dto';

@Injectable()
export class VideogameService {
  constructor(private readonly repo: VideogameRepository) {}

  async create(dto: CreateVideogameDto): Promise<number> {
    return await this.repo.create(dto);
  }

  async findCatalog(
    dto: QueryVideogamePaginatedDto,
  ): Promise<PaginatedResponseDto<VideogameCatalogDto>> {
    const [videogames, total] = await Promise.all([
      this.repo.findCatalogPaginated(dto),
      this.repo.count(dto),
    ]);

    return {
      data: videogames,
      page: dto.page,
      limit: dto.limit,
      total,
    };
  }

  async findAdminPaginated(
    dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteVideogameDto>> {
    const [videogames, total] = await Promise.all([
      this.repo.findAdminPaginated(dto),
      this.repo.countAll(),
    ]);

    return {
      data: videogames,
      total,
      limit: dto.limit,
      page: dto.page,
    };
  }

  async findById(id: number): Promise<CompleteVideogameDto> {
    const videogame = await this.repo.findById(id);

    if (!videogame)
      throw new NotFoundException(`Videogame with id: ${id} not found`);

    return videogame;
  }

  async update(dto: UpdateVideoGameDto, id: number): Promise<void> {
    const videogame = await this.repo.findById(id);

    if (!videogame)
      throw new NotFoundException(`Videogame with id: ${id} not found`);

    const updated = await this.repo.updateContent(dto, id);

    if (updated === 0) throw new BadRequestException('Nothing was updated');

    if (dto.categoryIds) {
      await this.repo.replaceCategories(id, dto.categoryIds);
    }
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);

    if (!deleted)
      throw new NotFoundException(`Videogame with id: ${id} not found`);
  }
}
