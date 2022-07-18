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
import { ApplicationService } from './application.service';
@Controller('/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('/me')
  async getApplications(@Request() req): Promise<ResponseApplicationDto[]> {
    const applications = await this.applicationService.findApplicationsByUserId(req.user.id);
    if (applications) return this.applicationService.mapApplicationsToResponseDto(applications);
    throw new NotFoundException();
  }

  @Post()
  async createApplication(@Body() body: CreateApplicationDto): Promise<ResponseApplicationDto> {
    // remove applicant id from create dto and just pull from req.user.id?
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.createApplication(body),
    );
  }

  @Put()
  async updateApplication(@Body() body: UpdateApplicationDto): Promise<ResponseApplicationDto> {
    // remove applicant id from update dto and just pull from req.user.id?
    // should update just be comment and state?
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplicationById(body),
    );
  }

  @Delete()
  async deleteApplications(@Request() req): Promise<DeleteResult> {
    return this.applicationService.deleteApplicationsByUserId(req.user.id);
  }
}
