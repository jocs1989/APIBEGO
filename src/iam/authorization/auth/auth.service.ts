import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthorizationService } from '../authorization.service';
import { HashingService } from 'src/iam/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AuthorizationService,
    private readonly hashingService: HashingService,
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
    return {_id, email, isValid, roles}
  }
}
