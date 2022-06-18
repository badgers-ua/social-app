import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from '../shared/schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../shared/schemas/follow.schema';
import { UsersService } from '../shared/providers/users/users.service';
import { auth } from 'firebase-admin';
import { UserService } from '../shared/providers/user/user.service';
import { Post as PostResDto } from '@sapp/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    private readonly usersService: UsersService,
    private readonly userService: UserService
  ) {}

  public async getFollowedUsersPosts(uid: string): Promise<PostResDto[]> {
    const followedUsers = await this.followModel.findOne({ uid }).exec();

    const { users }: auth.GetUsersResult =
      await this.usersService.getUsersByIdentifiers(
        followedUsers.follows.map((uid: string) => ({ uid }))
      );

    const posts: PostDocument[] = await this.postModel
      .find({ createdBy: { $in: followedUsers.follows } })
      .exec();

    const response = this.populateCreatedByField(posts, users);
    return response;
  }

  public async getMyPosts(uid: string): Promise<PostResDto[]> {
    const posts: PostDocument[] = await this.postModel
      .find({ createdBy: uid })
      .exec();

    const user: auth.UserRecord = await this.userService.getUserById(uid);

    const response = this.populateCreatedByField(posts, [user]);
    return response;
  }

  private populateCreatedByField = (
    posts: PostDocument[],
    users: auth.UserRecord[]
  ): PostResDto[] => {
    const postResDtos: any[] = posts.map(
      ({
        _id,
        text,
        createdAt,
        updatedAt,
        __v,
        createdBy: createdById,
      }: PostDocument & { createdAt: string; updatedAt: string }) => {
        return {
          _id,
          text,
          createdAt,
          updatedAt,
          __v,
          createdBy: users.find((u: auth.UserRecord) => u.uid === createdById),
        };
      }
    );
    return postResDtos;
  };
}
