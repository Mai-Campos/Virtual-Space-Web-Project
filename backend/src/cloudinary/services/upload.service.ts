import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class UploadService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) throw new BadRequestException('No image provided');

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      { folder: 'content' },
    );

    return result.secure_url;
  }
}
