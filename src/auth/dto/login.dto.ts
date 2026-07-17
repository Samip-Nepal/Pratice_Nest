import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  static email(email: any) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
