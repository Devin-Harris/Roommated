import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtAuthGuard } from './authentication/jwt/jwt-authentication.guard';
import { getEnvPath } from './envs/env.helper';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';

const envFilePath: string = getEnvPath(`${__dirname}/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_HOST),
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASS,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNC === 'true',
    }),
    UsersModule,
    GroupsModule,
    AuthenticationModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
