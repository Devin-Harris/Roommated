import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  async hash(plainText: string): Promise<string> {
    const hash = await bcrypt.hash(plainText, this.configService.get<number>('SALT_ROUNDS'));
    return hash
  }

  async isMatch(plainText: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(plainText, hash);
    return match
  }
}
