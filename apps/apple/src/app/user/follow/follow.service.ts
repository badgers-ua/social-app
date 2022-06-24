import { User } from '@sapp/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { auth } from 'firebase-admin';
import { Follow, FollowDocument } from '../../shared/schemas/follow.schema';
import { UsersService } from '../../shared/providers/users/users.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    private readonly usersService: UsersService
  ) {}

  public async follow(whoIsFollowingUid: string, uid): Promise<void> {
    await this.updateFollowsList(whoIsFollowingUid, uid, true);
  }

  public async unfollow(whoIsFollowingUid: string, uid): Promise<void> {
    await this.updateFollowsList(whoIsFollowingUid, uid, false);
  }

  public async whoAmIFollowing(uid: string): Promise<User[]> {
    const whoAmIFollowingUids: auth.UserIdentifier[] = (
      (await this.followModel.findOne({ uid }).exec())?.follows ?? []
    ).map((uid: string) => ({ uid }));
    const whoAmIFollowing: User[] =
      await this.usersService.getUsersByIdentifiers(whoAmIFollowingUids);
    return whoAmIFollowing;
  }

  public async myFollowers(uid: string): Promise<User[]> {
    const myFollowersUids: auth.UserIdentifier[] = (
      (await this.followModel.find({ follows: uid }).distinct('uid')) ?? []
    ).map((uid: string) => ({ uid }));
    const myFollowers: User[] = await this.usersService.getUsersByIdentifiers(
      myFollowersUids
    );
    return myFollowers;
  }

  public async getToFollowSuggestions(uid: string): Promise<User[]> {
    const whoAmIFollowingUsers: User[] = await this.whoAmIFollowing(uid);

    const allUsers: User[] = await this.usersService.getAllUsers();

    return allUsers
      .filter(
        (user: User) =>
          !whoAmIFollowingUsers.some((_user: User) => _user.uid === user.uid) &&
          user.uid !== uid
      )
      .slice(0, 5);
  }

  private async updateFollowsList(
    whoIsFollowingUid: string,
    follows: string,
    follow: boolean
  ) {
    const updateOperator = follow
      ? {
          $addToSet: { follows },
        }
      : {
          $pull: { follows },
        };

    const followsList: FollowDocument = await this.followModel
      .findOneAndUpdate({ uid: whoIsFollowingUid }, updateOperator, {
        new: true,
        upsert: true,
      })
      .exec();
    return followsList;
  }

  private getRandomNumberInRange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
