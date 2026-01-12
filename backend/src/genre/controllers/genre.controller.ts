import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EMPLOYEE)
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreService.create(createGenreDto);
  }

  @Get()
  async findAll(): Promise<Genre[]> {
    return await this.genreService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return await this.genreService.update(updateGenreDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.genreService.delete(id);
  }
}
