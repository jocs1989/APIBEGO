import { Injectable } from '@nestjs/common';

//interface the service the hashing
@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
