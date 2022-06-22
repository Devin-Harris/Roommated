import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  async validate(
    @Query('email') loginEmail: string,
    @Query('password') pswrd: string,
  ): Promise<any> {
    return this.authenticationService.validateUser(loginEmail, pswrd);
  }
}
