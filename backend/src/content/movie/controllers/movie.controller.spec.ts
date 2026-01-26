/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../services/movie.service';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginatedResponseDto } from 'src/content/common/dtos/paginated-response.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { CompleteMovieDto } from '../dtos/complete-movie.dto';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { MovieCatalogDto } from '../dtos/movie-catalog.dto';
import { QueryMoviePaginatedDto } from '../dtos/query-movie-paginated.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockMovieService = {
    findCatalog: jest.fn(),
    findAdminPaginated: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [{ provide: MovieService, useValue: mockMovieService }],
    })
      .overrideGuard(AuthenticationGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);

    jest.clearAllMocks();
  });

  // --------------------------
  // Test getMovieCatalog
  // --------------------------
  describe('getMovieCatalog', () => {
    it('should call movieService.findCatalog and return result', async () => {
      const dto: QueryMoviePaginatedDto = { page: 1, limit: 5 };
      const response: PaginatedResponseDto<MovieCatalogDto> = {
        data: [
          {
            id: 1,
            title: 'Movie 1',
            coverImg: 'test',
            genres: ['acción'],
          },
        ],
        page: 1,
        limit: 5,
        total: 10,
      };

      mockMovieService.findCatalog.mockResolvedValue(response);

      const result = await controller.getMovieCatalog(dto);

      expect(result).toEqual(response);
      expect(service.findCatalog).toHaveBeenCalledWith(dto);
    });
  });

  // --------------------------
  // Test getAdminMovie
  // --------------------------
  describe('getAdminMovie', () => {
    it('should call movieService.findAdminPaginated and return result', async () => {
      const dto: QueryAdminPaginatedDto = { page: 1, limit: 5 };
      const response: PaginatedResponseDto<CompleteMovieDto> = {
        data: [
          {
            id: 1,
            title: 'Movie 1',
            synopsis: 'test',
            coverImg: 'test',
            type: 'movie',
            size_gb: 1,
            director: {
              id: 1,
              name: 'test',
            },
            genres: [{ id: 1, name: 'acción' }],
          },
        ],
        page: 1,
        limit: 5,
        total: 0,
      };

      mockMovieService.findAdminPaginated.mockResolvedValue(response);

      const result = await controller.getAdminMovie(dto);

      expect(result).toEqual(response);
      expect(service.findAdminPaginated).toHaveBeenCalledWith(dto);
    });
  });

  // --------------------------
  // Test getMovieById
  // --------------------------
  describe('getMovieById', () => {
    it('should call movieService.findById and return movie', async () => {
      const movie: CompleteMovieDto = {
        id: 1,
        title: 'Movie 1',
        synopsis: 'test',
        coverImg: 'test',
        type: 'movie',
        size_gb: 1,
        director: {
          id: 1,
          name: 'test',
        },
        genres: [{ id: 1, name: 'acción' }],
      };
      mockMovieService.findById.mockResolvedValue(movie);

      const result = await controller.getMovieById(1);

      expect(result).toEqual(movie);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  // --------------------------
  // Test createMovie
  // --------------------------
  describe('createMovie', () => {
    it('should call movieService.create and return new movie id', async () => {
      const dto: CreateMovieDto = {
        title: 'New Movie',
        synopsis: 'test',
        coverImg: 'test',
        sizeGb: 1,
        directorId: 1,
        genreIds: [1],
      };
      mockMovieService.create.mockResolvedValue(1);

      const result = await controller.createMovie(dto);

      expect(result).toEqual(1);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  // --------------------------
  // Test updateMovie
  // --------------------------
  describe('updateMovie', () => {
    it('should call movieService.update with dto and id', async () => {
      const dto: UpdateMovieDto = { title: 'Updated Movie' };
      mockMovieService.update.mockResolvedValue(undefined);

      const result = await controller.updateMovie(dto, 1);

      expect(service.update).toHaveBeenCalledWith(dto, 1);
      expect(result).toBeUndefined();
    });
  });

  // --------------------------
  // Test deleteMovie
  // --------------------------
  describe('deleteMovie', () => {
    it('should call movieService.delete with id', async () => {
      mockMovieService.delete.mockResolvedValue(undefined);

      const result = await controller.deleteMovie(1);

      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
