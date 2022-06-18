import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from '../shared/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

const postModel = { name: Post.name, schema: PostSchema };

@Module({
  imports: [MongooseModule.forFeature([postModel])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
