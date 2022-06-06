import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter } from './profileImageFileFilter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './profileImages',
      fileFilter: imageFileFilter,
    }),
    EncryptionModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
