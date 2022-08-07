import { BadRequestException, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { PostSaveService } from './saves.service';

@Controller('postsaves')
export class PostSaveController {
  constructor(private readonly postSavesService: PostSaveService) {}

  @Get('/me')
  async getSavesForUser(@Request() req): Promise<any> {
    if (!req.user || !req.user.id) throw new BadRequestException();
    return this.postSavesService.getByUserId(req.user.id);
  }

  @Post(':id')
  async savePostForUser(@Param('id') postId, @Request() req): Promise<any> {
    if (!req.user || !req.user.id) throw new BadRequestException();
    return this.postSavesService.save(postId, req.user.id);
  }

  @Delete(':id')
  async deletePostSave(@Param('id') postSaveId, @Request() req): Promise<any> {
    if (!req.user || !req.user.id) throw new BadRequestException();
    return this.postSavesService.deleteByPostSaveId(postSaveId, req.user.id);
  }
}
