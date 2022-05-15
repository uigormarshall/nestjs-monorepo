import { NestFactory } from '@nestjs/core';
import { TodoApiModule } from './todo-api.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoApiModule);
  await app.listen(3000);
}
bootstrap();
