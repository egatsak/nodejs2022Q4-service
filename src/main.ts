import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js REST Service')
    .setDescription('REST API Docs')
    .setVersion('1.0.0')
    .addTag('egatsak')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  try {
    await app.listen(Number(PORT), () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (e: any) {
    console.log(e);
  }
}

bootstrap();
