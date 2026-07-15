import { Controller } from '@nestjs/common';
import { Userservice } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: Userservice) {}
}
