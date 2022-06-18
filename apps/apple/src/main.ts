import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await applyValidations(app);
  applyGlobalPrefix(app);
  if (!environment.production) {
    applySwaggerConfig(app);
    app.enableCors({ origin: 'http://localhost:4200' });
  }
  await app.listen(environment.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${environment.port}`
  );
}

const applyValidations = async (app) => {
  if (environment.production) {
    const helmet = (await import('helmet')).default;
    app.use(helmet());
  }
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
};

const applyGlobalPrefix = (app) => {
  app.setGlobalPrefix('api/v1');
};

const applySwaggerConfig = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Social App API')
    .setDescription('Awesome social media app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

bootstrap();
