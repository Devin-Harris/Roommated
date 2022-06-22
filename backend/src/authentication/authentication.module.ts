import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { EncryptionService } from '../encryption/encryption.service';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [EncryptionService, UsersService],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class EncryptionModule {}
