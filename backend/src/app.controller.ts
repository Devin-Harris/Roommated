import { Controller, Get, Header, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './authentication/local/local-authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { Role } from './authentication/roles/roles.decorator';
import { AuthRole } from '@rmtd/common/enums';
import { ResponseAuthenticatedUserDto } from '@rmtd/common/dtos';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Role(AuthRole.Public)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Role(AuthRole.Public)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // req.user object is created by Passport's validate() method (in local.strategy)
    return this.authenticationService.issueJWT(req.user);
  }

  @Role(AuthRole.Public)
  @Get('/reauth')
  async reauth(@Headers('Authorization') auth: string): Promise<ResponseAuthenticatedUserDto> {
    const jwt = auth.replace('Bearer ', '');
    return this.authenticationService.reauth(jwt);
  }

  @Role(AuthRole.Founder)
  @Get('secureRoute')
  async exampleRoute(@Request() req) {
    // req.user object is created by Passport's validate() method (in jwt.strategy)
    return req.user;
  }
}
