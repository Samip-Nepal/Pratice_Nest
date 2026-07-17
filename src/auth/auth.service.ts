import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Userservice } from '../users/users.service'; // Note: better to rename to UserService
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userservice: Userservice,
    private jwtservice: JwtService,
  ) {}

async register(dto: RegisterDto) {
    console.log('🟢 Register payload received:', dto);

    // Add validation
    if (!dto.name || !dto.email || !dto.password) {
        throw new BadRequestException('Name, email and password are required');
    }

    const existingUsername = await this.userservice.findByUsername(dto.name);
    if (existingUsername) {
        throw new ConflictException('Username already exists');
    }

    const existingEmail = await this.userservice.findByEmail(dto.email);
    if (existingEmail) {
        throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userservice.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
    });

    console.log('✅ User created with ID:', user.id);
    return { 
        message: 'User registered successfully', 
        userId: user.id 
    };
}

  async login(dto: LoginDto) {
    console.log('📧 Login attempt with email:', dto.email);

    const user = await this.userservice.findByEmail(dto.email);
    console.log('👤 User found from DB:', user ? 'YES' : 'NO');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    console.log('🔑 Password match:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = this.jwtservice.sign(payload);

    console.log('✅ Login successful');
    return { access_token };
  }
}
