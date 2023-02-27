import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerToFileService } from './utils/logger-service/logger-to-file.service';
import { MyLoggerService } from './utils/logger-service/logger.service';

const PORT = process.env.PORT || 4000;

export let timeStarted = 0;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js REST Service')
    .setDescription('REST API Docs')
    .setVersion('1.0.0')
    .addTag('egatsak')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  process.on('uncaughtException', (e) => {
    LoggerToFileService.syncErrorWriter(
      `${new Date().toISOString()} [error]: [UncaughtException] ERROR_MESSAGE: ${
        e.message
      } \n STACK:${e.stack}`,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    const fileLogger = new LoggerToFileService();
    const logger = new MyLoggerService(fileLogger);
    logger.error(
      `[UnhandledRejection] REASON: ${reason} \n PROMISE: ${JSON.stringify(
        promise,
      )}`,
    );
  });

  try {
    await app.listen(Number(PORT), () => {
      console.log(`Server listening on port ${PORT}`);
      timeStarted = Date.now();
    });
  } catch (e: any) {
    console.log(e);
  }
}

bootstrap();
