// Let's you type @UseGuards(JwtAuthGuard) instead of @UseGuards(AuthGuard('jwt'))

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
