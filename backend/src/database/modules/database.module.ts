import { Module } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';

@Module({
  providers: [DatabaseService],
  controllers: [],
})
export class DatabaseModule {}
