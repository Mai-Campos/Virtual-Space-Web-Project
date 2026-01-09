import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { MovieCatalogDto } from '../dtos/movie-catalog.dto';
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';
import { QueryMoviePaginatedDto } from '../dtos/query-movie-paginated.dto';
import { CompleteMovieDto } from '../dtos/complete-movie.dto';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { QueryAdminPaginatedDto } from '../../common/dtos/query-admin-paginated.dto';

@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // Funciona
  @Get('catalog')
  async getMovieCatalog(
    @Query() dto: QueryMoviePaginatedDto,
  ): Promise<PaginatedResponseDto<MovieCatalogDto>> {
    return this.movieService.findCatalog(dto);
  }

  // Funciona
  @Get('admin')
  async getAdminMovie(
    @Query() dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteMovieDto>> {
    return this.movieService.findAdminPaginated(dto);
  }

  // Funciona
  @Get(':id')
  async getMovieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompleteMovieDto> {
    return this.movieService.findById(id);
  }

  @Post()
  async createMovie(@Body() dto: CreateMovieDto): Promise<number> {
    return await this.movieService.create(dto);
  }

  @Patch(':id')
  async updateMovie(
    @Body() dto: UpdateMovieDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.movieService.update(dto, id);
  }
  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.delete(id);
  }
}
