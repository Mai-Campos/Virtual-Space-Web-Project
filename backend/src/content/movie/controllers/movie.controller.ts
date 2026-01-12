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
  UseGuards,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { MovieCatalogDto } from '../dtos/movie-catalog.dto';
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';
import { QueryMoviePaginatedDto } from '../dtos/query-movie-paginated.dto';
import { CompleteMovieDto } from '../dtos/complete-movie.dto';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { QueryAdminPaginatedDto } from '../../common/dtos/query-admin-paginated.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@UseGuards(AuthenticationGuard)
@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('catalog')
  async getMovieCatalog(
    @Query() dto: QueryMoviePaginatedDto,
  ): Promise<PaginatedResponseDto<MovieCatalogDto>> {
    return this.movieService.findCatalog(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get('admin')
  async getAdminMovie(
    @Query() dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteMovieDto>> {
    return this.movieService.findAdminPaginated(dto);
  }

  @Get(':id')
  async getMovieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompleteMovieDto> {
    return this.movieService.findById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post()
  async createMovie(@Body() dto: CreateMovieDto): Promise<number> {
    return await this.movieService.create(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Patch(':id')
  async updateMovie(
    @Body() dto: UpdateMovieDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.movieService.update(dto, id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieService.delete(id);
  }
}
