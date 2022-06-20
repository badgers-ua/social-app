import { Inject, Injectable } from '@nestjs/common';
import { FB_AUTH_PROVIDER_KEY } from '../../../_constants';
import { auth } from 'firebase-admin';
import { User as UserResDto } from '@sapp/types';

@Injectable()
export class UsersService {
  constructor(@Inject(FB_AUTH_PROVIDER_KEY) private readonly auth: auth.Auth) {}

  public async getUsers(
    searchTerm: string,
    uid: string
  ): Promise<UserResDto[]> {
    // firebase admin doesn't support search by name, so have to fake it
    const maxPageLimit = 1000;
    const { users }: auth.ListUsersResult = await this.auth.listUsers(
      maxPageLimit
    );
    const filteredUsers: auth.UserRecord[] = users.filter(
      ({ displayName = '', uid: _uid }) => {
        return displayName.split(' ').some((val: string) => {
          return (
            val.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            uid !== _uid
          );
        });
      }
    );
    return filteredUsers.map(({ uid, displayName, photoURL, email }) => {
      return {
        uid,
        displayName,
        email,
        photoURL,
      };
    });
  }

  public async getUsersByIdentifiers(
    identifiers: auth.UserIdentifier[]
  ): Promise<UserResDto[]> {
    const { users = [] } = await this.auth.getUsers(identifiers);
    return users.map(
      ({ uid, displayName, photoURL, email }: auth.UserRecord) => {
        return {
          uid,
          displayName,
          email,
          photoURL,
        };
      }
    );
  }
}
