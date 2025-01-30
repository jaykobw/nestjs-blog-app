import { Controller, Get } from '@nestjs/common';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';
import { ConfigService } from '@nestjs/config';
import os from 'os';

@Auth(AuthType.None)
@Controller()
export class AppController {
  constructor(
    /**
     * Inject configService
     */
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getStatus() {
    return {
      status: '(running)',
      docs: `${this.configService.get<string>('appConfig.baseUrl')}/api`,
    };
  }
}
