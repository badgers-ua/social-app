import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from '../shared/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from '../shared/schemas/follow.schema';
import { UsersServiceModule } from '../shared/providers/users/users-service.module';
import { UserServiceModule } from '../shared/providers/user/user-service.module';

const postModel = { name: Post.name, schema: PostSchema };
const followModel = { name: Follow.name, schema: FollowSchema };

@Module({
  imports: [
    MongooseModule.forFeature([postModel, followModel]),
    UserServiceModule,
    UsersServiceModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
