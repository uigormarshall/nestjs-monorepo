import { Test, TestingModule } from '@nestjs/testing';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';

describe('TodoApiController', () => {
  let todoApiController: TodoApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoApiController],
      providers: [TodoApiService],
    }).compile();

    todoApiController = app.get<TodoApiController>(TodoApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todoApiController.getHello()).toBe('Hello World!');
    });
  });
});
