import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { DeleteResult } from 'typeorm';
import { PostService } from '../post.service';
import { ApplicationService } from './application.service';
@Controller('/applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly postService: PostService,
  ) {}

  @Get('/sent')
  async getSentApplications(@Request() req): Promise<ResponseApplicationDto[]> {
    const applications = await this.applicationService.findApplicationsByIds({
      applicantGroupId: req.user.groupId,
    });
    return this.applicationService.mapApplicationsToResponseDto(applications);
  }

  @Get('/recieved')
  async getRecievedApplications(@Request() req): Promise<ResponseApplicationDto[]> {
    const groupPostId = await this.postService.findByGroupId(req.user.groupId);
    return this.applicationService.mapApplicationsToResponseDto(
      await this.applicationService.findApplicationsByIds({ postId: groupPostId.id }),
    );
  }

  @Post()
  async createApplication(
    @Body() body: { postId: number; comment?: string },
    @Request() req,
  ): Promise<ResponseApplicationDto> {
    const newApplication: CreateApplicationDto = {
      ...body,
      applicantUserId: req.user.id,
      applicantGroupId: req.user.groupId,
    };
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.createApplication(newApplication),
    );
  }

  @Put()
  async updateApplication(@Body() body: UpdateApplicationDto): Promise<ResponseApplicationDto> {
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplicationById(body),
    );
  }

  // @Delete()
  // async deleteApplications(@Request() req): Promise<DeleteResult> {
  //   return this.applicationService.deleteApplicationsByUserId(req.user.id);
  // }
}
