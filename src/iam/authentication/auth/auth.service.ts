import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthorizationService } from '../authentication.service';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AuthorizationService,
    private readonly hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.signIn(username);
    if (!user) {
      return null;
    }
    if (!user.isValid) {
      return null;
    }
    const isPassword = await this.hashingService.compare(pass, user.password);
    if (!isPassword) {
      return null;
    }
    const { _id, email, isValid, roles, ...otra } = user;
    return { _id, email, isValid, roles };
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      rol: user.roles,
      valid: user.isValid,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
