import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_HOST),
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASS,
      database:
        process.env.NODE_ENV === 'development'
          ? process.env.TYPEORM_DATABASE_DEV
          : process.env.TYPEORM_DATABASE_PROD,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
