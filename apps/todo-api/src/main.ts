import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TodoApiModule } from './todo-api.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoApiModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
