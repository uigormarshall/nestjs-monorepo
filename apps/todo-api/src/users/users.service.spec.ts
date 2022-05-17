import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersMockRepository } from '../shared/mocks/users.mock.repository';
import { TestUtils } from '../shared/utils/test.utils';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersMockRepository
  beforeEach(async () => {
    repository = new UsersMockRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: 'UsersRepositoryInterface', useValue: repository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    
  });

  it('UsersService deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Deve criar um User dado um CreateUserDto válido', async () => {

        const userDtoValid = TestUtils.getAValidCreateUserDto();
        const userValid = TestUtils.getAValidUser(userDtoValid);
        jest.spyOn(repository, 'hasRegisterWithThisEmail').mockImplementation(async () => false);
        jest.spyOn(repository, 'insert').mockImplementation(async () => userValid);
        const result = await service.create(userDtoValid)
        expect(result).toEqual(userValid);
    })

    it('Deve retornar HttpException quando existir um User com mesmo email', async () => {
        //throw new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST);
        const userDtoValid = TestUtils.getAValidCreateUserDto();
        const userValid = TestUtils.getAValidUser(userDtoValid);
        jest.spyOn(repository, 'hasRegisterWithThisEmail').mockImplementation(async () => true);
        jest.spyOn(repository, 'insert').mockImplementation(async () => userValid);
        expect(service.create(userDtoValid)).rejects.toEqual(new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST));
    })
  })
});
