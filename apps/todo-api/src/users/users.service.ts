import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './contracts/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';


@Injectable()
export class UsersService {
  constructor(@Inject('UsersRepositoryInterface') private usersRepository: UsersRepositoryInterface){

  }
  async create(createUserDto: CreateUserDto) {
    const hasUserWithEmail = await this.usersRepository.hasRegisterWithThisEmail(createUserDto.email);
    if(hasUserWithEmail) throw new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST);
    return this.usersRepository.insert(createUserDto)
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
