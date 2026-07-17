import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../auth/guards/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard) //
export class UsersController {
  @Get('dashboard')
  @Roles('user', 'moderator') // context.getHandler() will read this!
  getDashboard() {
    return { message: 'Welcome to the secret dashboard!' };
  }
}
