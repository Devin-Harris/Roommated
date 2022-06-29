import { Controller, Get } from '@nestjs/common';
import { Role } from './authentication/roles/roles.decorator';
import { AuthRole } from '@rmtd/common/enums';

@Controller()
export class AppController {
  constructor() {}

  @Role(AuthRole.Public)
  @Get()
  apiHome(): string {
    return 'Roommated Backend is Running';
  }
}
