import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './contracts/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersRepositoryInterface') private usersRepository: UsersRepositoryInterface){

  }
  async create(createUserDto: CreateUserDto) : Promise<User> {
    const hasUserWithEmail = await this.usersRepository.hasRegisterWithThisEmail(createUserDto.email);
    if(hasUserWithEmail) throw new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST);
    return this.usersRepository.insert(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string) : Promise<User>{
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) : Promise<User>{
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hasUserWithEmail = await this.usersRepository.hasRegisterWithThisEmail(updateUserDto.email);
    if(hasUserWithEmail) throw new HttpException('Ops! Já existe um usuario com esse email.', HttpStatus.BAD_REQUEST);
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) : Promise<void> {
    return this.usersRepository.remove(id);
  }
}
