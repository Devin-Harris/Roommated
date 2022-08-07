import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PostModule } from '../post.module';
import { PostService } from '../post.service';
import { PostSaveController } from './saves.controller';
import { PostSave } from './saves.entity';
import { PostSaveService } from './saves.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostSave]), forwardRef(() => PostModule), UsersModule],
  controllers: [PostSaveController],
  providers: [PostSaveService],
  exports: [PostSaveService],
})
export class PostSaveModule {}
