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
import { CreateDirectorDto } from '../dtos/create-director.dto';
import { UpdateDirectorDto } from '../dtos/update-director.dto';
import { DirectorService } from '../services/director.service';
import { Director } from '../models/director.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EMPLOYEE)
@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDirectorDto: CreateDirectorDto): Promise<Director> {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  async findAll(): Promise<Director[]> {
    return await this.directorService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ): Promise<Director> {
    return this.directorService.update(updateDirectorDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.directorService.delete(id);
  }
}
