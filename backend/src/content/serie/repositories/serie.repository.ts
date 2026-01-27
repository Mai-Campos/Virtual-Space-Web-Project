import { DatabaseService } from 'src/database/services/database.service';

import { ContentType } from 'src/content/enums/content_type.enum';

import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { Serie } from '../models/serie.model';
import { QuerySeriePaginatedDto } from '../dtos/query-serie-paginates.dto';
import { SerieCatalogDto } from '../dtos/serie-catalog.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { CompleteSerieDto } from '../dtos/complete-serie.dto';
import { UpdateSerieDto } from '../dtos/update-serie.dto';

@Injectable()
export class SerieRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateSerieDto): Promise<number> {
    const contentRes = await this.databaseService.query<{ id: number }>(
      'INSERT INTO contents (title, synopsis, cover_img, size_gb, content_type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [dto.title, dto.synopsis, dto.coverImg, dto.sizeGb, ContentType.SERIE],
    );

    const contentId = contentRes.rows[0].id;

    await this.databaseService.query<Serie>(
      'INSERT INTO series (content_id, seasons, platform_id) VALUES ($1, $2, $3)',
      [contentId, dto.seasons, dto.platformId],
    );

    for (const genreId of dto.genreIds) {
      await this.databaseService.query<Serie>(
        'INSERT INTO serie_genres (serie_id, genre_id) VALUES ($1, $2)',
        [contentId, genreId],
      );
    }

    return contentId;
  }

  async findCatalogPaginated(
    dto: QuerySeriePaginatedDto,
  ): Promise<SerieCatalogDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<SerieCatalogDto>(
      `
    SELECT
  c.id,
  c.title,
  c.synopsis,
  c.cover_img AS "coverImg",
  
   JSON_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'id', g.id,
      'name', g.name
    )
  ) AS genres,

  ARRAY_AGG(DISTINCT g.id) AS "genreIds"
  
FROM contents c
JOIN series s ON s.content_id = c.id
JOIN serie_genres sg ON sg.serie_id = c.id
JOIN genres g ON g.id = sg.genre_id
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
        ContentType.SERIE,
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
  ): Promise<CompleteSerieDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<CompleteSerieDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",
      s.seasons,
      p.name AS platform,

      

       JSON_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'id', g.id,
      'name', g.name
    )
  ) AS genres,

   ARRAY_AGG(DISTINCT g.id) AS "genreIds"

    FROM contents c
    JOIN series s ON s.content_id = c.id
    JOIN platforms p ON p.id = s.platform_id
    JOIN serie_genres sg ON sg.serie_id = c.id
    JOIN genres g ON g.id = sg.genre_id

    WHERE c.content_type = 'serie'

    GROUP BY c.id, p.name, s.seasons
    ORDER BY c.id DESC
    LIMIT $1 OFFSET $2
    `,
      [dto.limit, offset],
    );

    return result.rows;
  }

  async count(dto: QuerySeriePaginatedDto): Promise<number> {
    const result = await this.databaseService.query<{ total: string }>(
      `
    SELECT COUNT(DISTINCT c.id) AS total
    FROM contents c
    JOIN series s ON s.content_id = c.id
    JOIN serie_genres sg ON sg.serie_id = c.id
    JOIN genres g ON g.id = sg.genre_id
    WHERE c.content_type = 'serie'
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
      [ContentType.SERIE],
    );

    return Number(result.rows[0].total);
  }

  async findById(id: number): Promise<CompleteSerieDto | null> {
    const result = await this.databaseService.query<CompleteSerieDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",
      s.seasons,
      p.name AS platform,

       JSON_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'id', g.id,
      'name', g.name
    )
  ) AS genres,

   ARRAY_AGG(DISTINCT g.id) AS "genreIds"

    FROM contents c
    JOIN series s ON s.content_id = c.id
    JOIN platforms p ON p.id = s.platform_id
    JOIN serie_genres sg ON sg.serie_id = c.id
    JOIN genres g ON g.id = sg.genre_id

    WHERE c.id = $1
      AND c.content_type = $2

    GROUP BY c.id, p.name, s.seasons
    `,
      [id, ContentType.SERIE],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    await this.databaseService.query(
      'DELETE FROM serie_genres WHERE serie_id = $1',
      [id],
    );

    await this.databaseService.query(
      'DELETE FROM series WHERE content_id = $1',
      [id],
    );

    const result = await this.databaseService.query(
      'DELETE FROM contents WHERE id = $1 AND content_type = $2',
      [id, ContentType.SERIE],
    );

    return (result.rowCount ?? 0) > 0;
  }

  async updateContent(dto: UpdateSerieDto, id: number): Promise<number> {
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
        ContentType.SERIE,
      ],
    );

    return result.rowCount ?? 0;
  }

  async updatePlatform(serieId: number, platformId: number): Promise<void> {
    await this.databaseService.query(
      'UPDATE series SET platform_id = $1 WHERE content_id = $2',
      [platformId, serieId],
    );
  }

  async updateSeasons(serieId: number, seasons: number): Promise<void> {
    await this.databaseService.query(
      `
    UPDATE series
    SET seasons = $1
    WHERE content_id = $2
    `,
      [seasons, serieId],
    );
  }

  async replaceGenres(serieId: number, genresId: number[]): Promise<void> {
    // Eliminar la relacción con generos existentes
    await this.databaseService.query(
      'DELETE FROM serie_genres WHERE serie_id = $1',
      [serieId],
    );

    // Insertar nuevas relaciones de géneros
    for (const genreId of genresId) {
      await this.databaseService.query(
        'INSERT INTO serie_genres (serie_id, genre_id) VALUES ($1, $2)',
        [serieId, genreId],
      );
    }
  }
}
