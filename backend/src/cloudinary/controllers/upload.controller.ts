import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthenticationGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EMPLOYEE)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadService.uploadImage(file);
    return { url };
  }
}
