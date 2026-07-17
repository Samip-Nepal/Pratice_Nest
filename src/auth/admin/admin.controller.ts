import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';

import { Roles } from '../guards/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard) //
export class AdminController {
  @Get('dashboard')
  @Roles('admin', 'moderator') // context.getHandler() will read this!
  getDashboard() {
    return { message: 'Welcome to the secret dashboard!' };
  }

  @Delete('system-reset')
  @Roles('admin') // Only admins can reach this
  resetSystem() {
    return { message: 'System reset successful.' };
  }
  @Get('Service')
  @Roles('admin')
  getservice() {
    return { message: 'Welcome to the secret service!' };
  }
}
