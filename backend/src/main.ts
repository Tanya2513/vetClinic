import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VetClinicModule } from './clinic/vetClinicModule';
import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore1
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    VetClinicModule,
  );
  app.use(cookieParser());
  app.enableCors();
  await app.listen(5005);
}
bootstrap();
