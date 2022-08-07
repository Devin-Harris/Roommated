import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from '../post.service';
import { PostSave } from './saves.entity';

@Injectable()
export class PostSaveService {
  constructor(
    @InjectRepository(PostSave)
    private postSaveRepository: Repository<PostSave>,
    private postService: PostService,
  ) {}

  async getByUserId(userId: number) {
    return this.postSaveRepository.find({ where: { userId }, relations: ['post'] });
  }

  async save(postId: number, userId: number) {
    const userSaves = await this.postSaveRepository.find({ where: { userId } });
    if (userSaves.some((save) => save.postId === postId)) {
      throw new BadRequestException('You have already saved this post');
    }

    const postExists = await this.postService.findByPostId(postId);
    if (!postExists) {
      throw new BadRequestException('Post does not exist');
    }

    return this.postSaveRepository.save({ postId, userId });
  }

  async deleteByPostSaveId(postSaveId: number, userId: number) {
    const postSaveExists = await this.postSaveRepository.find({
      where: { id: postSaveId, userId },
    });
    if (!postSaveExists) {
      throw new BadRequestException('Post save does not exist for this user');
    }

    await this.postSaveRepository.delete({ id: postSaveId });
  }
}
