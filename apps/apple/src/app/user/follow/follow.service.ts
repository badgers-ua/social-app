import { User as UserResDto } from '@sapp/types';
import { UsersService } from './../../shared/providers/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../../shared/schemas/follow.schema';
import { auth } from 'firebase-admin';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    private readonly usersService: UsersService
  ) {}

  public async follow(whoIsFollowingUid: string, uid) {
    return this.updateFollowsList(whoIsFollowingUid, uid, true);
  }

  public async unfollow(whoIsFollowingUid: string, uid) {
    await this.updateFollowsList(whoIsFollowingUid, uid, false);
  }

  public async whoAmIFollowing(uid: string): Promise<UserResDto[]> {
    const whoAmIFollowingUids: auth.UserIdentifier[] = (
      (await this.followModel.findOne({ uid }).exec())?.follows ?? []
    ).map((uid: string) => ({ uid }));
    const whoAmIFollowing: UserResDto[] =
      await this.usersService.getUsersByIdentifiers(whoAmIFollowingUids);
    return whoAmIFollowing;
  }

  public async myFollowers(uid: string): Promise<UserResDto[]> {
    const myFollowersUids: auth.UserIdentifier[] = (
      (await this.followModel.find({ follows: uid }).distinct('uid')) ?? []
    ).map((uid: string) => ({ uid }));
    const myFollowers: UserResDto[] =
      await this.usersService.getUsersByIdentifiers(myFollowersUids);
    return myFollowers;
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
}
