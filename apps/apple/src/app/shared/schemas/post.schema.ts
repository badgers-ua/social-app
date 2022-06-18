import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { POST_MAX_LENGTH } from '../../post/_constants';

export type PostDocument = Post & mongoose.Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true,
    maxlength: POST_MAX_LENGTH,
  })
  text: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
  })
  createdBy: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
