import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostReqDto } from './dto/create-post-req.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../shared/schemas/post.schema';
import { UpdatePostReqDto } from './dto/update-post-req.dto';
import * as mongoose from 'mongoose';
import { POST_CRUD_ERROR_MSG } from './_constants';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>
  ) {}

  public async createPost(
    { text }: CreatePostReqDto,
    userId: string
  ): Promise<void | never> {
    await this.postModel.create({
      text,
      createdBy: userId,
    });
  }

  public async updatePost(
    id: string,
    { text }: UpdatePostReqDto,
    userId: string
  ): Promise<void | never> {
    const updatedPost: PostDocument | null =
      await this.postModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), createdBy: userId },
        {
          text,
          createdBy: userId,
        },
        { new: true }
      );
    if (!updatedPost) {
      throw new BadRequestException({ message: POST_CRUD_ERROR_MSG });
    }
  }

  public async deletePost(id: string, userId: string): Promise<void | never> {
    const deletedPost: PostDocument | null =
      await this.postModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
        createdBy: userId,
      });
    if (!deletedPost) {
      throw new BadRequestException({ message: POST_CRUD_ERROR_MSG });
    }
  }
}
