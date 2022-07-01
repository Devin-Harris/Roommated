import { forwardRef, Module } from '@nestjs/common';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GroupUsersModule } from 'src/groups/group-users/group-users.module';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
    GroupUsersModule,
    forwardRef(() => EncryptionModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
