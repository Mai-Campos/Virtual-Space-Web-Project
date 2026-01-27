import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SerieRepository } from '../repositories/serie.repository';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { QuerySeriePaginatedDto } from '../dtos/query-serie-paginates.dto';
import { PaginatedResponseDto } from 'src/content/common/dtos/paginated-response.dto';
import { SerieCatalogDto } from '../dtos/serie-catalog.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { CompleteSerieDto } from '../dtos/complete-serie.dto';
import { UpdateSerieDto } from '../dtos/update-serie.dto';

@Injectable()
export class SerieService {
  constructor(private readonly repo: SerieRepository) {}

  async create(dto: CreateSerieDto): Promise<number> {
    return await this.repo.create(dto);
  }

  async findCatalog(
    dto: QuerySeriePaginatedDto,
  ): Promise<PaginatedResponseDto<SerieCatalogDto>> {
    const [series, total] = await Promise.all([
      this.repo.findCatalogPaginated(dto),
      this.repo.count(dto),
    ]);

    return {
      data: series,
      page: dto.page,
      limit: dto.limit,
      total,
    };
  }

  async findAdminPaginated(
    dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteSerieDto>> {
    const [series, total] = await Promise.all([
      this.repo.findAdminPaginated(dto),
      this.repo.countAll(),
    ]);

    return {
      data: series,
      total,
      limit: dto.limit,
      page: dto.page,
    };
  }

  async findById(id: number): Promise<CompleteSerieDto> {
    const serie = await this.repo.findById(id);

    if (!serie) throw new NotFoundException(`Serie con id: ${id} no enontrada`);

    return serie;
  }

  async update(dto: UpdateSerieDto, id: number): Promise<void> {
    const serie = await this.repo.findById(id);

    if (!serie) throw new NotFoundException(`Serie con id: ${id} no enontrada`);

    const updated = await this.repo.updateContent(dto, id);

    if (updated === 0) throw new BadRequestException('Nada fue actualizado');

    if (typeof dto.platformId === 'number' && !Number.isNaN(dto.platformId)) {
      await this.repo.updatePlatform(id, dto.platformId);
    }

    if (dto.seasons !== undefined) {
      await this.repo.updateSeasons(id, dto.seasons);
    }

    if (dto.genreIds) {
      await this.repo.replaceGenres(id, dto.genreIds);
    }
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);

    if (!deleted)
      throw new NotFoundException(`Serie con id: ${id} no enontrada`);
  }
}
