import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClinicModule } from './clinic/clinicModule';
import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore1
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ClinicModule,
  );
  app.use(cookieParser());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
