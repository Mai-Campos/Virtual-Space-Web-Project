/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../models/category.model';
import { CanActivate } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Guards mockeados
class MockAuthGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

class MockRolesGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
    })
      .overrideGuard(AuthenticationGuard)
      .useClass(MockAuthGuard)
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a category', async () => {
      const dto: CreateCategoryDto = { name: 'Electronics' };
      const category: Category = { id: 1, name: 'Electronics' };

      mockCategoryService.create.mockResolvedValue(category);

      const result = await controller.create(dto);
      expect(result).toEqual(category);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Books' },
      ];

      mockCategoryService.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();
      expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update and return the category', async () => {
      const dto: UpdateCategoryDto = { name: 'Gadgets' };
      const updatedCategory: Category = { id: 1, name: 'Gadgets' };

      mockCategoryService.update.mockResolvedValue(updatedCategory);

      const result = await controller.update(1, dto);
      expect(result).toEqual(updatedCategory);
      expect(service.update).toHaveBeenCalledWith(dto, 1);
    });
  });

  describe('delete', () => {
    it('should delete the category', async () => {
      mockCategoryService.delete.mockResolvedValue(undefined);

      await controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
