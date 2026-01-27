/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  // Test register
  describe('register', () => {
    it('should call authService.register and return userId', async () => {
      const dto: CreateUserDto = {
        email: 'test@test.com',
        password: '123456',
        name: 'test',
      };
      mockAuthService.register.mockResolvedValue(1);

      const result = await controller.register(dto);

      expect(result).toBe(1);
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });

    it('should propagate exceptions from authService.register', async () => {
      const dto: CreateUserDto = {
        email: 'test@test.com',
        password: '123456',
        name: 'test',
      };
      mockAuthService.register.mockRejectedValue(new Error('Conflict'));

      await expect(controller.register(dto)).rejects.toThrow('Conflict');
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });
  });

  // Test login
  describe('login', () => {
    it('should call authService.login and return LoginResponseDto', async () => {
      const dto: LoginDto = { email: 'test@test.com', password: '123456' };
      const loginResponse: LoginResponseDto = {
        accesToken: 'jwtToken',
        user: { id: 1, email: dto.email, roles: ['USER'] },
      };

      mockAuthService.login.mockResolvedValue(loginResponse);

      const result = await controller.login(dto);

      expect(result).toEqual(loginResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });

    it('should propagate exceptions from authService.login', async () => {
      const dto: LoginDto = { email: 'test@test.com', password: 'wrongpass' };
      mockAuthService.login.mockRejectedValue(new Error('Unauthorized'));

      await expect(controller.login(dto)).rejects.toThrow('Unauthorized');
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });
  });
});
