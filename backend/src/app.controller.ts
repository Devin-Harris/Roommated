import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './authentication/local/local-authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtAuthGuard } from './authentication/jwt/jwt-authentication.guard';
import { Auth } from './authentication/auth.decorator';
import { AuthType } from '@rmtd/common/enums';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Auth(AuthType.Founder)
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Auth(AuthType.Public)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // req.user object is created by Passport's validate() method (in local.strategy)
    return this.authenticationService.issueJWT(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('secureRoute')
  async exampleRoute(@Request() req) {
    // req.user object is created by Passport's validate() method (in jwt.strategy)
    return req.user;
  }
}
