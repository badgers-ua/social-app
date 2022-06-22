import { User } from '@sapp/types';
import { Inject, Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { FB_AUTH_PROVIDER_KEY } from '../../../_constants';

@Injectable()
export class UserService {
  constructor(@Inject(FB_AUTH_PROVIDER_KEY) private readonly auth: auth.Auth) {}

  public async getUserByEmail(email: string): Promise<User> {
    return User.fromUserRecord(await this.auth.getUserByEmail(email));
  }

  public async getUserById(userIdToSearch: string): Promise<User> {
    return User.fromUserRecord(await this.auth.getUser(userIdToSearch));
  }
}
