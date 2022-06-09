import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';

// NB: Order of the config method invocation is important, it SHOULD BE BEFORE any other modules import lines
// This ensure env variables are injected before any other modules loaded. Otherwise there might be delay in
// injecting these variables to other modules if ConfigService is used due to its asynchronous injection nature.
// Eg: Cloudinary need CLOUDINARY_URL to be present when storage is initialised. But when initialised outside
// controller or service, the env variable might not be present during invocation. eg: users.controller.ts
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rommated API')
    .setDescription('The Roommated API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
