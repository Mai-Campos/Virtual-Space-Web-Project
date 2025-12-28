import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { CategoryRepository } from '../repositories/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
