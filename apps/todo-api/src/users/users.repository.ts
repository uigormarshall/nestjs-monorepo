import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepositoryInterface } from './contracts/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersRepository implements UsersRepositoryInterface{
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async hasRegisterWithThisEmail(email: string): Promise<boolean> {
    const has = await this.usersRepository.findOneBy({
      email: email
    });
    
    return has !== null ? true : false;
  }
  async insert(createUserDto: CreateUserDto): Promise<User> {
     const result = await this.usersRepository.insert(createUserDto);
     return this.findOne(result.raw.id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({
        id: id
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}