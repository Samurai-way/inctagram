import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import { UsersService } from '../../users/service/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'loginOrEmail' });
  }

  async validate(loginOrEmail: string, password: string): Promise<User> {
    const user: any = await this.usersService.checkUserCredentials(
      loginOrEmail,
      password,
    );
    if (!user) throw new NotFoundException([]);
    return user;
  }
}
