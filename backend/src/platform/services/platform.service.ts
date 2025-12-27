import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from '../dtos/create-platform.dto';
import { UpdatePlatformDto } from '../dtos/update-platform.dto';

@Injectable()
export class PlatformService {
  create(createPlatformDto: CreatePlatformDto) {
    return 'This action adds a new platform';
  }

  findAll() {
    return `This action returns all platform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} platform`;
  }

  update(id: number, updatePlatformDto: UpdatePlatformDto) {
    return `This action updates a #${id} platform`;
  }

  remove(id: number) {
    return `This action removes a #${id} platform`;
  }
}
