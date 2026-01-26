import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieRepository } from '../repositories/movie.repository';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { QueryMoviePaginatedDto } from '../dtos/query-movie-paginated.dto';
import { MovieCatalogDto } from '../dtos/movie-catalog.dto';
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';
import { CompleteMovieDto } from '../dtos/complete-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { QueryAdminPaginatedDto } from '../../common/dtos/query-admin-paginated.dto';

@Injectable()
export class MovieService {
  constructor(private readonly repo: MovieRepository) {}

  async create(dto: CreateMovieDto): Promise<number> {
    return await this.repo.create(dto);
  }

  async findCatalog(
    dto: QueryMoviePaginatedDto,
  ): Promise<PaginatedResponseDto<MovieCatalogDto>> {
    const [movies, total] = await Promise.all([
      this.repo.findCatalogPaginated(dto),
      this.repo.count(dto),
    ]);

    return {
      data: movies,
      page: dto.page,
      limit: dto.limit,
      total,
    };
  }

  async findAdminPaginated(
    dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteMovieDto>> {
    const [movies, total] = await Promise.all([
      this.repo.findAdminPaginated(dto),
      this.repo.countAll(),
    ]);

    return {
      data: movies,
      total,
      limit: dto.limit,
      page: dto.page,
    };
  }

  async findById(id: number): Promise<CompleteMovieDto> {
    const movie = await this.repo.findById(id);

    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`);

    return movie;
  }

  async update(dto: UpdateMovieDto, id: number): Promise<void> {
    const movie = await this.repo.findById(id);

    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`);

    const updated = await this.repo.updateContent(dto, id);

    if (updated === 0) throw new BadRequestException('Nothing was updated');

    if (typeof dto.directorId === 'number' && !Number.isNaN(dto.directorId)) {
      await this.repo.updateDirector(id, dto.directorId);
    }

    if (dto.genreIds) {
      await this.repo.replaceGenres(id, dto.genreIds);
    }
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);

    if (!deleted) throw new NotFoundException(`Movie with id: ${id} not found`);
  }
}
