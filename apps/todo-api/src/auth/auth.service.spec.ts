import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersMockRepository } from '../shared/mocks/users.mock.repository';import { TestUtils } from '../shared/utils/test.utils';
;
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let repository = new UsersMockRepository();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ PassportModule,   JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '86400s' },
      }),],
      providers: [AuthService, UsersService, { provide: 'UsersRepositoryInterface', useValue: repository }, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('AuthService deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('Deve retornar HttpException quando o usuario não for encontrado', () => {
        const aValidLoginDto = TestUtils.getALoginDto();
        jest.spyOn(repository, 'findOneByEmail').mockImplementation(async () => null);
        expect(service.login(aValidLoginDto)).rejects.toEqual(new HttpException('Usuario inválido', HttpStatus.BAD_GATEWAY));
    });

    it('Deve retornar HttpException quando a senha for invalida', () => {
      const userDtoValid = TestUtils.getAValidCreateUserDto();
      const userValid = TestUtils.getAValidUser(userDtoValid);
      const aValidLoginDto = TestUtils.getALoginDto();
      aValidLoginDto.password = "WrongPassword"
      jest.spyOn(repository, 'findOneByEmail').mockImplementation(async () => userValid);
      expect(service.login(aValidLoginDto)).rejects.toEqual(new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED));
    });

    it('Deve retornar token quando email e senha forem validos', async () => {
      const userDtoValid = TestUtils.getAValidCreateUserDto();
      const userValid = TestUtils.getAValidUser(userDtoValid);
      const aValidLoginDto = TestUtils.getALoginDto();
      jest.spyOn(repository, 'findOneByEmail').mockImplementation(async () => userValid);
      const response = await service.login(aValidLoginDto)
      expect(response.token).toBeDefined()
    });
  })
});
