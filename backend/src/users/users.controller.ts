import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {
  UpdateUserDto,
  UpdateUsersDto,
  ResponseUserDto,
  CreateUserDto,
  ResponseAuthenticatedUserDto,
} from '@rmtd/common/dtos';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { UploadProfileImgDto } from './users.dto';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthRole } from '@rmtd/common/enums';
import { Role } from 'src/authentication/roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiNotFoundResponse()
  async findByIds(@Query('ids') idsString: string): Promise<ResponseUserDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const users = await this.userService.findByIds(ids);

    if (users.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!users.some((user) => user.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(`Could not find users with the ids: ${notFoundIds}`);
    }

    return this.userService.mapUsersToResponseDto(users);
  }

  @Role(AuthRole.Public)
  @Get(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);
    if (user) return this.userService.mapUserToResponseDto(user);

    throw new NotFoundException();
  }

  @Post('/groupless')
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiNotFoundResponse()
  async findGrouplessUsersBySearchText(
    @Body() body: { searchText: string },
  ): Promise<ResponseUserDto[]> {
    if (!body.searchText) {
      throw new BadRequestException('Must provide valid search text');
    }
    const users = await this.userService.findGrouplessUsersBySearchText(body.searchText);
    if (users) return this.userService.mapUsersToResponseDto(users);

    throw new NotFoundException();
  }

  @Post()
  @Role(AuthRole.Public)
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  async makeUser(@Body() body: CreateUserDto): Promise<ResponseAuthenticatedUserDto> {
    const user = await this.userService.createUser(body);
    const { access_token } = await this.authenticationService.issueJWT(user);
    return { user: this.userService.mapUserToResponseDto(user), access_token };
  }

  @Post('/profileImage')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: String, description: 'Cloudinary URL' })
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadProfileImageDto: UploadProfileImgDto,
  ): Promise<String> {
    const response: UploadApiErrorResponse | UploadApiResponse =
      await this.userService.uploadProfileImage(file);
    return response.url;
  }

  @Put()
  @Role(AuthRole.Founder)
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  async updateByIds(@Body() body: UpdateUsersDto): Promise<ResponseUserDto[]> {
    const users = await this.userService.updateByIds(body);
    return this.userService.mapUsersToResponseDto(users);
  }

  @Put('me')
  @ApiOkResponse({ type: ResponseUserDto })
  async updateById(@Body() body: UpdateUserDto, @Request() req): Promise<ResponseUserDto> {
    if (!req.user.isAdmin || (req.user.isAdmin && !body.id)) {
      body.id = req.user.id;
    }

    const user = await this.userService.updateById(body);
    return this.userService.mapUserToResponseDto(user);
  }

  @Delete()
  @Role(AuthRole.Founder)
  @ApiOkResponse({ type: DeleteResult })
  async deleteByIds(@Query('ids') idsString: string): Promise<DeleteResult> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    return await this.userService.deleteByIds(ids);
  }

  @Delete('me')
  @ApiOkResponse({ type: DeleteResult })
  async deleteById(@Request() req): Promise<DeleteResult> {
    const id = req.user.id;
    return await this.userService.deleteById(id);
  }
}
