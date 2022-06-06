import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v2 } from 'cloudinary';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
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
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
