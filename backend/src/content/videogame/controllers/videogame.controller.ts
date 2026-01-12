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
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { VideogameService } from '../services/videogame.service';
import { QueryVideogamePaginatedDto } from '../dtos/query-videogame-paginated.dto';
import { PaginatedResponseDto } from 'src/content/common/dtos/paginated-response.dto';
import { VideogameCatalogDto } from '../dtos/videogame-catalog.dto';
import { CompleteVideogameDto } from '../dtos/complete-videogame.dto';
import { CreateVideogameDto } from '../dtos/create-videogame.dto';
import { UpdateVideoGameDto } from '../dtos/update-videogame.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@UseGuards(AuthenticationGuard)
@Controller('/videogames')
export class VideoGameController {
  constructor(private readonly videogameService: VideogameService) {}

  @Get('catalog')
  async getSerieCatalog(
    @Query() dto: QueryVideogamePaginatedDto,
  ): Promise<PaginatedResponseDto<VideogameCatalogDto>> {
    return this.videogameService.findCatalog(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get('admin')
  async getAdminSerie(
    @Query() dto: QueryAdminPaginatedDto,
  ): Promise<PaginatedResponseDto<CompleteVideogameDto>> {
    return this.videogameService.findAdminPaginated(dto);
  }

  @Get(':id')
  async getSerieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompleteVideogameDto> {
    return this.videogameService.findById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post()
  async createSerie(@Body() dto: CreateVideogameDto): Promise<number> {
    return this.videogameService.create(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Patch(':id')
  async updateSerie(
    @Body() dto: UpdateVideoGameDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.videogameService.update(dto, id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Delete(':id')
  async deleteSerie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.videogameService.delete(id);
  }
}
