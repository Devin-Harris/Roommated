import { ApiProperty } from '@nestjs/swagger';

export class UploadProfileImgDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
