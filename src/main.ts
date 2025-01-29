import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /**
   * Add middleware
   */
  appCreate(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
