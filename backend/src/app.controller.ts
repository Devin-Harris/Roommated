import { Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './authentication/local-authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtAuthGuard } from './authentication/jwt-authentication.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @SetMetadata('authType', 'admin')
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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
