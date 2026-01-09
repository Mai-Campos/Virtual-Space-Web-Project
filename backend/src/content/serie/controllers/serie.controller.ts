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
import { SerieService } from '../services/serie.service';
import { QuerySeriePaginatedDto } from '../dtos/query-serie-paginates.dto';
import { PaginatedResponseDto } from 'src/content/common/dtos/paginated-response.dto';
import { SerieCatalogDto } from '../dtos/serie-catalog.dto';
import { CompleteSerieDto } from '../dtos/complete-serie.dto';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { UpdateSerieDto } from '../dtos/update-serie.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';

@Controller('/series')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Get('catalog')
  async getSerieCatalog(
    @Query() dto: QuerySeriePaginatedDto,
  ): Promise<PaginatedResponseDto<SerieCatalogDto>> {
    return this.serieService.findCatalog(dto);
  }

  // Funciona
  @Get('admin')
  async getAdminSerie(
    @Query() dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteSerieDto>> {
    return this.serieService.findAdminPaginated(dto);
  }

  // Funciona
  @Get(':id')
  async getSerieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompleteSerieDto> {
    return this.serieService.findById(id);
  }

  @Post()
  async createSerie(@Body() dto: CreateSerieDto): Promise<number> {
    return this.serieService.create(dto);
  }

  @Patch(':id')
  async updateSerie(
    @Body() dto: UpdateSerieDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.serieService.update(dto, id);
  }
  @Delete(':id')
  async deleteSerie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.serieService.delete(id);
  }
}
