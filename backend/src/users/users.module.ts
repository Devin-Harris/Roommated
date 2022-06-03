import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { EncryptionService } from 'src/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, EncryptionService],
  controllers: [UsersController],
})
export class UsersModule {}
