import { auth } from 'firebase-admin';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  uid: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  displayName?: string;
  @ApiProperty()
  photoURL?: string;

  static fromUserRecord(userRecord: auth.UserRecord): User {
    const { displayName, photoURL, uid, email }: auth.UserRecord = userRecord;
    const user: User = { uid, photoURL, displayName, email };
    return user;
  }
}

export class Post {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  text: string;
  @ApiProperty({ type: User })
  createdBy: User;
  @ApiProperty({ type: Date })
  createdAt: string;
  @ApiProperty({ type: Date })
  updatedAt: string;
  @ApiProperty()
  __v: number;
}
