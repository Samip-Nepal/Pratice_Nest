import { Injectable,ConflictException,UnauthorizedException } from '@nestjs/common';
import {JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Userservice } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        private userservice:Userservice,
        private jwtservice:JwtService,
    ){}
async register(dto:RegisterDto){
    const existingusername= await this.userservice.findByUsername(dto.name);
    if(existingusername){
        throw new ConflictException("username exist");
    }
  const existingEmail = await this.userservice.findByEmail(dto.email);
if (existingEmail) {
  throw new ConflictException('Email already exists');
}
const hashedpassword=await bcrypt.hash(dto.password, 10);
const user = await this.userservice.create({
    name:dto.name,
    email:dto.email,
    password:hashedpassword
});
return {
    message:"User register",
    userId:user.id
}

}
async login(dto:LoginDto){
    const user = await this.userservice.findByEmail(dto.email);
if (!user) {
  throw new UnauthorizedException('Invalid credentials');
}
const ismatch= bcrypt.compare(dto.password, user.password);
if (!ismatch) {
  throw new UnauthorizedException('Invalid credentials');
}
const payload={
    sub:user.id,
    username:user.name,
};
const token=this.jwtservice.sign(payload);
return {
  access_token: token,
};
}


}
