import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoApiController } from './todo-api.controller';
import { TodoApiService } from './todo-api.service';
import { typeOrmConfig } from './typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule, SharedModule],
  controllers: [TodoApiController],
  providers: [TodoApiService],
})
export class TodoApiModule {}
