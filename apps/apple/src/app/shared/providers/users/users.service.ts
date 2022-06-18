import { Inject, Injectable } from '@nestjs/common';
import { FB_AUTH_PROVIDER_KEY } from '../../../_constants';
import { auth } from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(@Inject(FB_AUTH_PROVIDER_KEY) private readonly auth: auth.Auth) {}

  public async getUsers(
    searchTerm: string,
    uid: string,
  ): Promise<auth.UserRecord[]> {
    // firebase admin doesn't support search by name, so have to fake it
    const maxPageLimit = 1000;
    const { users }: auth.ListUsersResult = await this.auth.listUsers(
      maxPageLimit,
    );
    const filteredUsers: auth.UserRecord[] = users.filter(
      ({ displayName = '', uid: _uid }) => {
        return displayName.split(' ').some((val: string) => {
          return (
            val.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            uid !== _uid
          );
        });
      },
    );
    return filteredUsers;
  }

  public getUsersByIdentifiers(
    identifiers: auth.UserIdentifier[],
  ): Promise<auth.GetUsersResult> {
    return this.auth.getUsers(identifiers);
  }
}
