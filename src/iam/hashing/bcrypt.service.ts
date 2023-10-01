import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    // best practice for auth method
    const salt = await genSalt(); //the fault is 10
    return hash(data, salt);
  }
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    // comparin hash for pass o not pass
    return compare(data, encrypted);
  }
}
