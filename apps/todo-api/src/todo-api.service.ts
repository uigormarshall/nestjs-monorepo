import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
