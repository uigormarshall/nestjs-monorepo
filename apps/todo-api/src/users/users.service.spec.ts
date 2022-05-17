import { Test, TestingModule } from '@nestjs/testing';
import { UsersMockRepository } from '../shared/mocks/users.mock.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: 'UsersRepositoryInterface', useClass: UsersMockRepository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('UsersService deve ser definido', () => {
    expect(service).toBeDefined();
  });
});
