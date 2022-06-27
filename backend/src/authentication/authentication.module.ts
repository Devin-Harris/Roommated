import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { User } from 'src/users/users.entity';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GroupUsersModule } from 'src/groups/group-users/group-users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EncryptionModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
    GroupUsersModule,
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
