import { Controller, Get } from '@nestjs/common';
import { TodoApiService } from './todo-api.service';

@Controller()
export class TodoApiController {
  constructor(private readonly todoApiService: TodoApiService) {}

  @Get()
  getHello(): string {
    return this.todoApiService.getHello();
  }
}
