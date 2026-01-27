import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      user: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      database: this.config.get<string>('DB_NAME'),
    });

    await this.pool.query('SELECT 1');
    this.logger.log('PostgreSQL conectado');
  }

  async query<T extends QueryResultRow>(
    sql: string,
    params?: any[],
  ): Promise<QueryResult<T>> {
    if (!this.pool)
      throw new InternalServerErrorException(
        'Pool de Base de Datos no inicializado',
      );

    return this.pool.query<T>(sql, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('PostgreSQL desconectado');
  }
}
