import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { MulterModule } from '@nestjs/platform-express';
import { profileImageFileFilter } from './profileImageFileFilter';
import { CloudinaryModule } from 'src/providers/cloudinary/cloudinary.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      fileFilter: profileImageFileFilter,
    }),
    CloudinaryModule,
    forwardRef(() => AuthenticationModule),
    forwardRef(() => EncryptionModule),
  ],
  providers: [UsersService, CloudinaryService, EncryptionService],
  controllers: [UsersController],
  exports: [UsersService, CloudinaryService, EncryptionService],
})
export class UsersModule {}
