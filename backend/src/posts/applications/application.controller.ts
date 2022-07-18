import { Body, Controller, Get, NotFoundException, Post, Put, Request } from '@nestjs/common';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
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
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.createApplication(body),
    );
  }

  @Put()
  async updateApplication(@Body() body: UpdateApplicationDto): Promise<ResponseApplicationDto> {
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplication(body),
    );
  }
}
