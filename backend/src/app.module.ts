import { Module } from '@nestjs/common';
import { GenreModule } from './genre/modules/genre.module';
import { CategoryModule } from './category/modules/category.module';
import { PlatformModule } from './platform/modules/platform.module';
import { AuthModule } from './auth/modules/auth.module';
import { DatabaseModule } from './database/modules/database.module';
import { DirectorModule } from './director/modules/director.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GenreModule,
    CategoryModule,
    DirectorModule,
    PlatformModule,
    AuthModule,
    DatabaseModule,
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
