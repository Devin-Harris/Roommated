import { forwardRef, Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/providers/cloudinary/cloudinary.module';
import { PostModule } from '../post.module';
import { PostSaveController } from './saves.controller';
import { PostSaveService } from './saves.service';

@Module({
  imports: [CloudinaryModule, forwardRef(() => PostModule)],
  controllers: [PostSaveController],
  providers: [PostSaveService],
  exports: [PostSaveService],
})
export class PostSaveModule {}
