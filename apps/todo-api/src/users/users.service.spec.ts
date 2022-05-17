import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersMockRepository } from '../shared/mocks/users.mock.repository';
import { TestUtils } from '../shared/utils/test.utils';
import { User } from './entities/user.entity';
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
        const userDtoValid = TestUtils.getAValidCreateUserDto();
        const userValid = TestUtils.getAValidUser(userDtoValid);
        jest.spyOn(repository, 'hasRegisterWithThisEmail').mockImplementation(async () => true);
        jest.spyOn(repository, 'insert').mockImplementation(async () => userValid);
        expect(service.create(userDtoValid)).rejects.toEqual(new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST));
    })
  })
  describe('FindOne', () => {
    it('Dado um Id válido deve retornar o User correspondente', async () => {
        const userDtoValid = TestUtils.getAValidCreateUserDto();
        const userValid = TestUtils.getAValidUser(userDtoValid);
        const id = userValid.id;

        jest.spyOn(repository, 'findOne').mockImplementation(async () => userValid);
        const result = await service.findOne(id)
        expect(result).toEqual(userValid);
    })

    it('Dado um id inválido deve retornar null', async () => {
      const id = 'um_id_invalido';
      jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
      const result = await service.findOne(id)
      expect(result).toEqual(null);
    })
  })

  describe('FindOneByEmail', () => {
    it('Dado um Email válido deve retornar o User correspondente', async () => {
        const userDtoValid = TestUtils.getAValidCreateUserDto();
        const userValid = TestUtils.getAValidUser(userDtoValid);
        const email = userValid.email;

        jest.spyOn(repository, 'findOneByEmail').mockImplementation(async () => userValid);
        const result = await service.findOneByEmail(email)
        expect(result).toEqual(userValid);
    })

    it('Dado um email inválido deve retornar null', async () => {
      const email = 'email_invalido';
      jest.spyOn(repository, 'findOneByEmail').mockImplementation(async () => null);
      const result = await service.findOneByEmail(email)
      expect(result).toEqual(null);
    })
  })

  describe('FindAll', () => {
    it('Dado nenhum resultado no respositorio deve retornar um array vazio', async () => {
        jest.spyOn(repository, 'findAll').mockImplementation(async () => []);
        const result = await service.findAll()
        expect(result).toEqual([]);
    })

    it('Dado algum resultado no respositorio deve retornar uma lista de User', async () => {
      const userDtoValid = TestUtils.getAValidCreateUserDto();
      const userValid = TestUtils.getAValidUser(userDtoValid);
      const listOfUsers : User[] = []
      listOfUsers.push(userValid);

      jest.spyOn(repository, 'findAll').mockImplementation(async () => listOfUsers);
      const result = await service.findAll()
      expect(Array.isArray(result)).toEqual(true);
      expect(result[0]).toBeInstanceOf(User);
    })
  })
});
