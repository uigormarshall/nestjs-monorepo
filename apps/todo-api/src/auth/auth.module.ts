import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule,   JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '86400s' },
  }),],
  providers: [AuthService, UsersService, { provide: 'UsersRepositoryInterface', useClass: UsersRepository }, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
