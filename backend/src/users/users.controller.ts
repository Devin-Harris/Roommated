import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateUsersDto, UpdateUserDto, UpdateUsersDto, ResponseUserDto } from '@rmtd/common/dtos';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { UploadProfileImgDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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

  @Get(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);

    if (user) return this.userService.mapUserToResponseDto(user);

    throw new NotFoundException();
  }

  @Post()
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  async makeUsers(@Body() body: CreateUsersDto): Promise<ResponseUserDto[]> {
    const users = await this.userService.createUsers(body);
    return this.userService.mapUsersToResponseDto(users);
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
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  async updateByIds(@Body() body: UpdateUsersDto): Promise<ResponseUserDto[]> {
    // TODO: Check to make sure user in JWT token is a admin
    const users = await this.userService.updateByIds(body);
    return this.userService.mapUsersToResponseDto(users);
  }

  @Put(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  async updateById(@Body() body: UpdateUserDto): Promise<ResponseUserDto> {
    // TODO: Check to make sure user in JWT token is a admin OR user has same id of user being updated
    const user = await this.userService.updateById(body);
    return this.userService.mapUserToResponseDto(user);
  }

  @Delete()
  @ApiOkResponse({ type: DeleteResult })
  async deleteByIds(@Query('ids') idsString: string): Promise<DeleteResult> {
    // TODO: Check to make sure user in JWT token is a admin
    const ids = idsString.split(',').map((id) => parseInt(id));
    return await this.userService.deleteByIds(ids);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteResult })
  async deleteById(@Param('id') id: number): Promise<DeleteResult> {
    // TODO: Check to make sure user in JWT token is a admin OR user has same id of user being updated
    return await this.userService.deleteById(id);
  }
}
