import { DatabaseService } from 'src/database/services/database.service';
import { ContentType } from 'src/content/enums/content_type.enum';
import { Injectable } from '@nestjs/common';
import { CreateVideogameDto } from '../dtos/create-videogame.dto';
import { Videogame } from '../models/videogame.model';
import { QueryVideogamePaginatedDto } from '../dtos/query-videogame-paginated.dto';
import { VideogameCatalogDto } from '../dtos/videogame-catalog.dto';
import { QueryAdminPaginatedDto } from 'src/content/common/dtos/query-admin-paginated.dto';
import { CompleteVideogameDto } from '../dtos/complete-videogame.dto';
import { UpdateVideoGameDto } from '../dtos/update-videogame.dto';

@Injectable()
export class VideogameRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateVideogameDto): Promise<number> {
    const contentRes = await this.databaseService.query<{ id: number }>(
      'INSERT INTO contents (title, synopsis, cover_img, size_gb, content_type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [
        dto.title,
        dto.synopsis,
        dto.coverImg,
        dto.sizeGb,
        ContentType.VIDEOGAME,
      ],
    );

    const contentId = contentRes.rows[0].id;

    await this.databaseService.query<Videogame>(
      'INSERT INTO videogames (content_id) VALUES ($1)',
      [contentId],
    );

    for (const categoryId of dto.categoryIds) {
      await this.databaseService.query<Videogame>(
        'INSERT INTO videogame_categories (videogame_id, category_id) VALUES ($1, $2)',
        [contentId, categoryId],
      );
    }

    return contentId;
  }

  async findCatalogPaginated(
    dto: QueryVideogamePaginatedDto,
  ): Promise<VideogameCatalogDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<VideogameCatalogDto>(
      `
    SELECT
  c.id,
  c.title,
  c.synopsis,
  c.cover_img AS "coverImg",
   JSON_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'id', ca.id,
      'name', ca.name
    )
  ) AS categories,

   ARRAY_AGG(DISTINCT ca.id) AS "categoryIds"
FROM contents c
JOIN videogames v ON v.content_id = c.id
JOIN videogame_categories vc ON vc.videogame_id = c.id
JOIN categories ca ON ca.id = vc.category_id
WHERE c.content_type = $1
  AND ($2::text IS NULL OR c.title ILIKE '%' || $2 || '%')
  AND (
    $3::int[] IS NULL
    OR ca.id = ANY($3)
  )
GROUP BY c.id
HAVING (
  $3::int[] IS NULL
  OR COUNT(DISTINCT ca.id) = array_length($3, 1)
)
ORDER BY c.title
LIMIT $4 OFFSET $5
    `,
      [
        ContentType.VIDEOGAME,
        dto.search ?? null,
        dto.categories ?? null,
        dto.limit,
        offset,
      ],
    );

    return result.rows;
  }

  async findAdminPaginated(
    dto: QueryAdminPaginatedDto,
  ): Promise<CompleteVideogameDto[]> {
    const offset = (dto.page - 1) * dto.limit;

    const result = await this.databaseService.query<CompleteVideogameDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",

      json_agg(
        DISTINCT jsonb_build_object(
          'id', ca.id,
          'name', ca.name
        )
      ) AS categories

    FROM contents c
    JOIN videogames v ON v.content_id = c.id
    JOIN videogame_categories vc ON vc.videogame_id = c.id
    JOIN categories ca ON ca.id = vc.category_id

    WHERE c.content_type = 'videogame'

    GROUP BY c.id 
    ORDER BY c.id DESC
    LIMIT $1 OFFSET $2
    `,
      [dto.limit, offset],
    );

    return result.rows;
  }

  async count(dto: QueryVideogamePaginatedDto): Promise<number> {
    const result = await this.databaseService.query<{ total: string }>(
      `
    SELECT COUNT(DISTINCT c.id) AS total
    FROM contents c
    JOIN videogames v ON v.content_id = c.id
    JOIN videogame_categories vc ON vc.videogame_id = c.id
    JOIN categories ca ON ca.id = vc.category_id
    WHERE c.content_type = 'videogame'
      AND ($1::text IS NULL OR c.title ILIKE '%' || $1 || '%')
      AND (
        $2::text[] IS NULL
        OR ca.name = ANY($2)
      )
    `,
      [dto.search ?? null, dto.categories ?? null],
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
      [ContentType.VIDEOGAME],
    );

    return Number(result.rows[0].total);
  }

  async findById(id: number): Promise<CompleteVideogameDto | null> {
    const result = await this.databaseService.query<CompleteVideogameDto>(
      `
    SELECT
      c.id,
      c.title,
      c.synopsis,
      c.cover_img AS "coverImg",
      c.size_gb AS "sizeGb",

      
   JSON_AGG(
    DISTINCT JSONB_BUILD_OBJECT(
      'id', ca.id,
      'name', ca.name
    )
  ) AS categories,

  ARRAY_AGG(DISTINCT ca.id) AS "categoryIds"

    FROM contents c
    JOIN videogames v ON v.content_id = c.id
    JOIN videogame_categories vc ON vc.videogame_id = c.id
    JOIN categories ca ON ca.id = vc.category_id

    WHERE c.id = $1
      AND c.content_type = $2

    GROUP BY c.id
    `,
      [id, ContentType.VIDEOGAME],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    await this.databaseService.query(
      'DELETE FROM videogame_categories WHERE videogame_id = $1',
      [id],
    );

    await this.databaseService.query(
      'DELETE FROM videogames WHERE content_id = $1',
      [id],
    );

    const result = await this.databaseService.query(
      'DELETE FROM contents WHERE id = $1 AND content_type = $2',
      [id, ContentType.VIDEOGAME],
    );

    return (result.rowCount ?? 0) > 0;
  }

  async updateContent(dto: UpdateVideoGameDto, id: number): Promise<number> {
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
        ContentType.VIDEOGAME,
      ],
    );

    return result.rowCount ?? 0;
  }

  async replaceCategories(
    videogameId: number,
    categoriesId: number[],
  ): Promise<void> {
    // Eliminar la relacción con generos existentes
    await this.databaseService.query(
      'DELETE FROM videogame_categories WHERE videogame_id = $1',
      [videogameId],
    );

    // Insertar nuevas relaciones de géneros
    for (const categoryId of categoriesId) {
      await this.databaseService.query(
        'INSERT INTO videogame_categories (videogame_id, category_id) VALUES ($1, $2)',
        [videogameId, categoryId],
      );
    }
  }
}
