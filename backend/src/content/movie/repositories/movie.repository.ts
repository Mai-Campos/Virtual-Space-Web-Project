import { DatabaseService } from 'src/database/services/database.service';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from '../models/movie.model';
import { ContentType } from 'src/content/enums/content_type.enum';
import { QueryMoviePaginatedDto } from '../dtos/query-movie-paginated.dto';
import { MovieCatalogDto } from '../dtos/movie-catalog.dto';
import { CompleteMovieDto } from '../dtos/complete-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { Injectable } from '@nestjs/common';
import { QueryAdminPaginatedDto } from '../../common/dtos/query-admin-paginated.dto';

@Injectable()
export class MovieRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateMovieDto): Promise<number> {
    const contentRes = await this.databaseService.query<{ id: number }>(
      'INSERT INTO contents (title, synopsis, cover_img, size_gb, content_type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [dto.title, dto.synopsis, dto.coverImg, dto.sizeGb, ContentType.MOVIE],
    );

    const contentId = contentRes.rows[0].id;

    await this.databaseService.query<Movie>(
      'INSERT INTO movies (content_id, director_id) VALUES ($1, $2)',
      [contentId, dto.directorId],
    );

    for (const genreId of dto.genreIds) {
      await this.databaseService.query<Movie>(
        'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)',
        [contentId, genreId],
      );
    }

    return contentId;
  }

  async findCatalogPaginated(
    dto: QueryMoviePaginatedDto,
  ): Promise<MovieCatalogDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<MovieCatalogDto>(
      `
    SELECT
  c.id,
  c.title,
  c.cover_img AS "coverImg",
  ARRAY_AGG(DISTINCT g.name) AS genres
FROM contents c
JOIN movies m ON m.content_id = c.id
JOIN movie_genres mg ON mg.movie_id = c.id
JOIN genres g ON g.id = mg.genre_id
WHERE c.content_type = $1
  AND ($2::text IS NULL OR c.title ILIKE '%' || $2 || '%')
  AND (
    $3::int[] IS NULL
    OR g.id = ANY($3)
  )
GROUP BY c.id
HAVING (
  $3::int[] IS NULL
  OR COUNT(DISTINCT g.id) = array_length($3, 1)
)
ORDER BY c.title
LIMIT $4 OFFSET $5
    `,
      [
        ContentType.MOVIE,
        dto.search ?? null,
        dto.genres ?? null,
        dto.limit,
        offset,
      ],
    );

    return result.rows;
  }

  async findAdminPaginated(
    dto: QueryAdminPaginatedDto,
  ): Promise<CompleteMovieDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<CompleteMovieDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",

      json_build_object(
        'id', d.id,
        'name', d.name
      ) AS director,

      json_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name
        )
      ) AS genres

    FROM contents c
    JOIN movies m ON m.content_id = c.id
    JOIN directors d ON d.id = m.director_id
    JOIN movie_genres mg ON mg.movie_id = c.id
    JOIN genres g ON g.id = mg.genre_id

    WHERE c.content_type = 'movie'

    GROUP BY c.id, d.id
    ORDER BY c.id DESC
    LIMIT $1 OFFSET $2
    `,
      [dto.limit, offset],
    );

    return result.rows;
  }

  async count(dto: QueryMoviePaginatedDto): Promise<number> {
    const result = await this.databaseService.query<{ total: string }>(
      `
    SELECT COUNT(DISTINCT c.id) AS total
    FROM contents c
    JOIN movies m ON m.content_id = c.id
    JOIN movie_genres mg ON mg.movie_id = c.id
    JOIN genres g ON g.id = mg.genre_id
    WHERE c.content_type = 'movie'
      AND ($1::text IS NULL OR c.title ILIKE '%' || $1 || '%')
      AND (
        $2::text[] IS NULL
        OR g.name = ANY($2)
      )
    `,
      [dto.search ?? null, dto.genres ?? null],
    );

    return Number(result.rows[0].total);
  }

  async countAll(): Promise<number> {
    const result = await this.databaseService.query<{ total: number }>(
      `
    SELECT COUNT(*) AS total
    FROM contents
    WHERE content_type = $1
    `,
      [ContentType.MOVIE],
    );

    return Number(result.rows[0].total);
  }

  async findById(id: number): Promise<CompleteMovieDto | null> {
    const result = await this.databaseService.query<CompleteMovieDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",

      json_build_object(
        'id', d.id,
        'name', d.name
      ) AS director,

      json_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name
        )
      ) AS genres

    FROM contents c
    JOIN movies m ON m.content_id = c.id
    JOIN directors d ON d.id = m.director_id
    JOIN movie_genres mg ON mg.movie_id = c.id
    JOIN genres g ON g.id = mg.genre_id

    WHERE c.id = $1
      AND c.content_type = $2

    GROUP BY c.id, d.id
    `,
      [id, ContentType.MOVIE],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    await this.databaseService.query(
      'DELETE FROM movie_genres WHERE movie_id = $1',
      [id],
    );

    await this.databaseService.query(
      'DELETE FROM movies WHERE content_id = $1',
      [id],
    );

    const result = await this.databaseService.query(
      'DELETE FROM contents WHERE id = $1 AND content_type = $2',
      [id, ContentType.MOVIE],
    );

    return (result.rowCount ?? 0) > 0;
  }

  async updateContent(dto: UpdateMovieDto, id: number): Promise<number> {
    const result = await this.databaseService.query(
      `
    UPDATE contents
    SET
      title = COALESCE($1, title),
      synopsis = COALESCE($2, synopsis),
      cover_img = COALESCE($3, cover_img),
      size_gb = COALESCE($4, size_gb)
    WHERE id = $5 AND content_type = $6
    `,
      [
        dto.title,
        dto.synopsis,
        dto.coverImg,
        dto.sizeGb,
        id,
        ContentType.MOVIE,
      ],
    );

    return result.rowCount ?? 0;
  }

  async updateDirector(movieId: number, directorId: number): Promise<void> {
    await this.databaseService.query(
      'UPDATE movies SET director_id = $1 WHERE content_id = $2',
      [directorId, movieId],
    );
  }

  async replaceGenres(movieId: number, genresId: number[]): Promise<void> {
    // Eliminar la relacción con generos existentes
    await this.databaseService.query(
      'DELETE FROM movie_genres WHERE movie_id = $1',
      [movieId],
    );

    // Insertar nuevas relaciones de géneros
    for (const genreId of genresId) {
      await this.databaseService.query(
        'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)',
        [movieId, genreId],
      );
    }
  }
}
