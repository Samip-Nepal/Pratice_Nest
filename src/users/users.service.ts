import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class Userservice {
  constructor(
    @InjectRepository(User)
    private userrepo: Repository<User>,
  ) {}
  findByEmail(email: string) {
    return this.userrepo.findOne({
      where: { email },
    });
  }
  findByUsername(name: string) {
    return this.userrepo.findOne({
      where: { name },
    });
  }
  async create(userdata: { name: string; email: string; password: string }) {
    const user = this.userrepo.create(userdata);
    return this.userrepo.save(user);
  }
}
