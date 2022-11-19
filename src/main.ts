import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import AllExceptionFilter from './common/exceptions/all-exception.filter';
import ValidationException from './common/exceptions/validation.exception';
import ValidationFilter from './common/exceptions/validation.filter';
import { logger } from './common/utils/functions';
import { BackendURL } from './config/glob.config';
import SwaggerConfig from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionFilter(), new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages: object[] = errors.map(err => ({
          [err.property]: Object.values(err.constraints),
        }));
        return new ValidationException(messages);
      }
    })
  )
  SwaggerConfig(app);
  await app.listen(process.env.APP_PORT, () => {
    logger.debug(BackendURL);
  });
}
bootstrap();
