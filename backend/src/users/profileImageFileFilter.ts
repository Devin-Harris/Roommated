import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  const fileSize = parseInt(req.headers['content-length']);
  if (fileSize > 1024 * 1024 * 2) {
    return callback(
      new BadRequestException('Only image files under 2MB are allowed!'),
      false,
    );
  }
  callback(null, true);
};
