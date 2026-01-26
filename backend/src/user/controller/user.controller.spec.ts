/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Role } from 'src/role/enums/role.enum';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findEmployees: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(AuthenticationGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  // --------------------------
  // Test create
  // --------------------------
  describe('create', () => {
    it('should call userService.create and return result', async () => {
      const dto: CreateUserDto = {
        email: 'test@test.com',
        password: '123456',
        name: 'Test User',
      };
      mockUserService.create.mockResolvedValue({
        id: 1,
        ...dto,
        roles: [Role.EMPLOYEE],
      });

      const result = await controller.create(dto);

      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        password: '123456',
        name: 'Test User',
        roles: [Role.EMPLOYEE], // o 'employee' literal
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  // --------------------------
  // Test findAllEmployees
  // --------------------------
  describe('findAllEmployees', () => {
    it('should call userService.findEmployees and return result', async () => {
      const employees = [
        { id: 1, email: 'e1@test.com' },
        { id: 2, email: 'e2@test.com' },
      ];
      mockUserService.findEmployees.mockResolvedValue(employees);

      const result = await controller.findAllEmployees();

      expect(result).toEqual(employees);
      expect(service.findEmployees).toHaveBeenCalled();
    });
  });

  // --------------------------
  // Test findByEmail
  // --------------------------
  describe('findByEmail', () => {
    it('should call userService.findByEmail and return user', async () => {
      const user = { id: 1, email: 'test@test.com' };
      mockUserService.findByEmail.mockResolvedValue(user);

      const result = await controller.findByEmail('test@test.com');

      expect(result).toEqual(user);
      expect(service.findByEmail).toHaveBeenCalledWith('test@test.com');
    });
  });

  // --------------------------
  // Test update
  // --------------------------
  describe('update', () => {
    it('should call userService.update and return updated user', async () => {
      const dto: UpdateEmployeeDto = { email: 'new@test.com' };
      const updated = { id: 1, ...dto };
      mockUserService.update.mockResolvedValue(updated);

      const result = await controller.update(1, dto);

      expect(result).toEqual(updated);
      expect(service.update).toHaveBeenCalledWith(dto, 1);
    });
  });

  // --------------------------
  // Test delete
  // --------------------------
  describe('delete', () => {
    it('should call userService.delete with id', async () => {
      mockUserService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(1);

      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
