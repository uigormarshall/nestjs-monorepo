import { Module } from '@nestjs/common';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';

@Module({
  imports: [],
  controllers: [TodoApiController],
  providers: [TodoApiService],
})
export class TodoApiModule {}
