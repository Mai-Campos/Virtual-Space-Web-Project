import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repositories/user.repository';
import { UserBootsrapService } from '../service/user-bootstrap.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserBootsrapService],
  exports: [UserRepository, UserBootsrapService],
})
export class UserModule {}
