import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationDto } from '@rmtd/common/dtos';
import { ApplicationService } from './application.service';
@Controller('/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async createApplication(@Body() body: ApplicationDto): Promise<ApplicationDto> {
    return this.applicationService.createApplication(body);
  }
}
