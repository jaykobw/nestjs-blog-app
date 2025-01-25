import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  private readonly saltRounds = 12;

  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(data, salt);
  }

  public comparePassword(
    data: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, encryptedPassword);
  }
}
