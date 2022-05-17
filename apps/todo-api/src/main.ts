import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BasicLoggerService } from './shared/loggers/basic.logger.service';
import { TodoApiModule } from './todo-api.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(TodoApiModule,{
    logger: new BasicLoggerService(),
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Todo-API')
  .setDescription('Api Utilizada para fins didaticos')
  .setVersion('1.0')
  .addTag('TodoApi')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
