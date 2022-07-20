import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { AuthRole } from '@rmtd/common/enums';
import { Role } from 'src/authentication/roles/roles.decorator';
import { DeleteResult } from 'typeorm';
import { ApplicationService } from './application.service';

@Controller('/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('/outgoing')
  async getOutgoingApplications(@Request() req): Promise<ResponseApplicationDto[]> {
    // Returns applications that were sent by user's group
    return this.applicationService.mapApplicationsToResponseDto(
      await this.applicationService.findApplicationsByIds({
        applicantGroupId: req.user.groupId,
      }),
    );
  }

  @Get('/incoming')
  async getIncomingApplications(@Request() req): Promise<ResponseApplicationDto[]> {
    // Returns applications to post by user's group
    return this.applicationService.mapApplicationsToResponseDto(
      await this.applicationService.incomingApplications(req.user.groupId),
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

  @Put('/me')
  async updateApplicationComment(
    @Body() body: { id: number; comment?: string },
    @Request() req,
  ): Promise<ResponseApplicationDto> {
    // Gets application to be updated
    const applicationForUpdate = await this.applicationService.findApplicationsByIds({
      id: body.id,
    });
    if (!applicationForUpdate[0]) throw new NotFoundException();

    // Only update comment if application was made by the user
    if (applicationForUpdate[0].applicantUserId != req.user.id) throw new UnauthorizedException();

    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplicationById({ id: body.id, comment: body.comment }),
    );
  }

  @Role(AuthRole.GroupAdmin)
  @Put('/group')
  async updateGroupApplication(
    @Body() body: UpdateApplicationDto,
    @Request() req,
  ): Promise<ResponseApplicationDto> {
    // Gets application to be updated
    const applicationForUpdate = await this.applicationService.findApplicationsByIds({
      id: body.id,
    });
    if (!applicationForUpdate[0]) throw new NotFoundException();

    // Only update state if application is on post made by user's own group
    if (body.state && applicationForUpdate[0].post.groupId != req.user.groupId)
      throw new UnauthorizedException();

    // Only update comment if application was made by user's own group
    if (body.comment != undefined && applicationForUpdate[0].applicantGroupId != req.user.groupId)
      throw new UnauthorizedException();

    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplicationById(body),
    );
  }

  @Role(AuthRole.Founder)
  @Put()
  async updateApplication(@Body() body: UpdateApplicationDto): Promise<ResponseApplicationDto> {
    return this.applicationService.mapApplicationToResponseDto(
      await this.applicationService.updateApplicationById(body),
    );
  }

  @Delete('/me')
  async deleteUserApplications(
    @Body() body: { id?: number; postId?: number },
    @Request() req,
  ): Promise<DeleteResult> {
    // Deletes applications created by user matching provided specifications
    return this.applicationService.deleteApplicationsByIds({
      ...body,
      applicantUserId: req.user.id,
    });
  }

  @Role(AuthRole.GroupAdmin)
  @Delete('/group')
  async deleteGroupUserApplications(
    @Body()
    body: {
      id?: number;
      postId?: number;
      applicantUserId?: number;
      applicantGroupId?: number;
    },
    @Request() req,
  ): Promise<DeleteResult> {
    // Get the applications selected by parameters
    const applicationsForDeletion = await this.applicationService.findApplicationsByIds(body);
    // Check that user is authorized to delete each one
    for (const application of applicationsForDeletion) {
      // Application must either be made by user's own group, or on a post by the user's own group
      if (
        application.applicantGroupId != req.user.groupId &&
        application.post.groupId != req.user.groupId
      ) {
        throw new UnauthorizedException();
      }
    }
    // User is authorized to delete all selected applications
    return this.applicationService.deleteApplicationsByIds(body);
  }

  @Role(AuthRole.Founder)
  @Delete()
  async deleteApplications(
    @Body()
    body: {
      id?: number;
      postId?: number;
      applicantUserId?: number;
      applicantGroupId?: number;
    },
  ): Promise<DeleteResult> {
    if (!body.id && !body.postId && !body.applicantUserId && !body.applicantGroupId)
      throw new UnauthorizedException();
    return this.applicationService.deleteApplicationsByIds(body);
  }
}
