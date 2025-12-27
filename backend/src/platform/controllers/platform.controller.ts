import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePlatformDto } from '../dtos/create-platform.dto';
import { UpdatePlatformDto } from '../dtos/update-platform.dto';
import { PlatformService } from '../services/platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  create(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformService.create(createPlatformDto);
  }

  @Get()
  findAll() {
    return this.platformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return this.platformService.update(+id, updatePlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformService.remove(+id);
  }
}
