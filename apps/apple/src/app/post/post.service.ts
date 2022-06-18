import { Injectable } from '@nestjs/common';
import { CreatePostReqDto } from './dto/create-post-req.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../shared/schemas/post.schema';
import { UpdatePostReqDto } from './dto/update-post-req.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  public async createPost(
    { text }: CreatePostReqDto,
    userId: string,
  ): Promise<PostDocument> {
    const createdPost: PostDocument = await this.postModel.create({
      text,
      createdBy: userId,
    });
    return createdPost;
  }

  public async updatePost(
    id: string,
    { text }: UpdatePostReqDto,
    userId: string,
  ): Promise<PostDocument | null> {
    const updatedPost: PostDocument | null =
      await this.postModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), createdBy: userId },
        {
          text,
          createdBy: userId,
        },
        { new: true },
      );

    return updatedPost;
  }

  public async deletePost(
    id: string,
    userId: string,
  ): Promise<PostDocument | null> {
    const deletedPost: PostDocument | null =
      await this.postModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
        createdBy: userId,
      });
    return deletedPost;
  }
}
