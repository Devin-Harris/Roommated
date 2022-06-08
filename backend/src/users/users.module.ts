import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { MulterModule } from '@nestjs/platform-express';
import { profileImageFileFilter } from './profileImageFileFilter';
import { CloudinaryModule } from 'src/providers/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      fileFilter: profileImageFileFilter,
    }),
    EncryptionModule,
    CloudinaryModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
