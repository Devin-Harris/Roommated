// Let's you type @UseGuards(LocalAuthGuard) instead of @UseGuards(AuthGuard('local'))

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
