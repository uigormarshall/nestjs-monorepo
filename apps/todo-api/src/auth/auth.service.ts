import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResultDto } from './dto/login-result.dto';
const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
     const user = await this.usersService.findOneByEmail(loginDto.email);
     
     if(!user) throw new HttpException('Usuario inválido', HttpStatus.BAD_GATEWAY);
     
     if(this.passwordIsEqual(loginDto.password, user.password)){
        const { password, ...payload } = user;
        const token = this.jwtService.sign(payload);
        return new LoginResultDto(token);
     }

     throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
  }

  private passwordIsEqual(password: string, hash: string): boolean {
      return bcrypt.compareSync(password, hash); 
  }
}