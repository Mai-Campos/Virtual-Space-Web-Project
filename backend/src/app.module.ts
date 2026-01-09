import { Module } from '@nestjs/common';
import { GenreModule } from './genre/modules/genre.module';
import { CategoryModule } from './category/modules/category.module';
import { PlatformModule } from './platform/modules/platform.module';
import { AuthModule } from './auth/modules/auth.module';
import { DatabaseModule } from './database/modules/database.module';
import { DirectorModule } from './director/modules/director.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './content/movie/modules/movie.module';
import { SerieModule } from './content/serie/modules/serie.module';
import { VideogameModule } from './content/videogame/modules/videogame.module';

@Module({
  imports: [
    GenreModule,
    CategoryModule,
    DirectorModule,
    PlatformModule,
    AuthModule,
    DatabaseModule,
    MovieModule,
    SerieModule,
    VideogameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
