import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDirectorDto } from '../dtos/create-director.dto';
import { UpdateDirectorDto } from '../dtos/update-director.dto';
import { DirectorService } from '../services/director.service';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }
}
