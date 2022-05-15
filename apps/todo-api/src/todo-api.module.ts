import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';
import { typeOrmConfig } from './typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  controllers: [TodoApiController],
  providers: [TodoApiService],
})
export class TodoApiModule {}
