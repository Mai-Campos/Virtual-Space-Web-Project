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
import { CreatePlatformDto } from '../dtos/create-platform.dto';
import { UpdatePlatformDto } from '../dtos/update-platform.dto';
import { PlatformService } from '../services/platform.service';
import { Platform } from '../models/platform.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EMPLOYEE)
@Controller('platforms')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPlatformDto: CreatePlatformDto,
  ): Promise<Platform> {
    return await this.platformService.create(createPlatformDto);
  }

  @Get()
  async findAll(): Promise<Platform[]> {
    return await this.platformService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return await this.platformService.update(updatePlatformDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.platformService.delete(id);
  }
}
