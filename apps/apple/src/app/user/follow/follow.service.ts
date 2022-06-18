import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../../shared/schemas/follow.schema';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>
  ) {}

  public async follow(whoIsFollowingUid: string, uid) {
    return this.updateFollowsList(whoIsFollowingUid, uid, true);
  }

  public async unfollow(whoIsFollowingUid: string, uid) {
    return this.updateFollowsList(whoIsFollowingUid, uid, false);
  }

  public async whoAmIFollowing(uid: string): Promise<string[]> {
    return (await this.followModel.findOne({ uid }).exec())?.follows ?? [];
  }

  public async myFollowers(uid: string): Promise<string[]> {
    return (this.followModel.find as any)({ follows: [uid] }).distinct('uid');
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
