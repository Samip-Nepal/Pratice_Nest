import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';

@Controller('home')
export class HomeController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getHome(@Request() req) {
    return {
      message: `Welcome to Home, ${req.user.username}!`,
      user: req.user,
    };
  }
}
