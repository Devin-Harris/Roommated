import { Controller, Get, Header, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { AuthRole } from '@rmtd/common/enums';
import { ResponseAuthenticatedUserDto } from '@rmtd/common/dtos';
import { Role } from './roles/roles.decorator';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './local/local-authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Role(AuthRole.Public)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    // req.user object is created by Passport's validate() method (in local.strategy)
    return this.authenticationService.login(req.user);
  }

  @Role(AuthRole.Public)
  @Get('/reauth')
  async reauth(@Headers('Authorization') auth: string): Promise<ResponseAuthenticatedUserDto> {
    const jwt = auth?.replace('Bearer ', '');
    return this.authenticationService.reauth(jwt);
  }

  @Role(AuthRole.Founder)
  @Get('/secureRoute')
  async exampleRoute(@Request() req) {
    // req.user object is created by Passport's validate() method (in jwt.strategy)
    return req.user;
  }
}
