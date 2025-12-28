import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(`api/${config.get<string>('API_VERSION')}`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
