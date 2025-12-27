import { Module } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';
import { DatabaseController } from '../controllers/database.controller';

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
})
export class DatabaseModule {}
