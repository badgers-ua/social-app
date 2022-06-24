import { Inject, Injectable } from '@nestjs/common';
import { FB_AUTH_PROVIDER_KEY } from '../../../_constants';
import { auth } from 'firebase-admin';
import { User } from '@sapp/types';

@Injectable()
export class UsersService {
  constructor(@Inject(FB_AUTH_PROVIDER_KEY) private readonly auth: auth.Auth) {}

  public async searchUsers(searchTerm: string, uid: string): Promise<User[]> {
    const users = await this.getAllUsers();

    const filteredUsers: User[] = users.filter(
      ({ displayName = '', uid: _uid }) => {
        return displayName.split(' ').some((val: string) => {
          return (
            val.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            uid !== _uid
          );
        });
      }
    );
    return filteredUsers;
  }

  public async getUsersByIdentifiers(
    identifiers: auth.UserIdentifier[]
  ): Promise<User[]> {
    const { users = [] } = await this.auth.getUsers(identifiers);
    return users.map((userRecord: auth.UserRecord) => {
      return User.fromUserRecord(userRecord);
    });
  }

  public async getAllUsers(): Promise<User[]> {
    // firebase admin doesn't support search by name, so have to fake it
    const maxPageLimit = 1000;
    const { users }: auth.ListUsersResult = await this.auth.listUsers(
      maxPageLimit
    );

    return users.map(User.fromUserRecord);
  }
}
