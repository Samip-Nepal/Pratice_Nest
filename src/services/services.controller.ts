import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('services')
export class ServicesController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getServices(@Request() req) {
    return {
      message: `Services for ${req.user.username}`,
      user: req.user,
      data: [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'App Development' },
        { id: 3, name: 'UI/UX Design' },
      ],
    };
  }
}
