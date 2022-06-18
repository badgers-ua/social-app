import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FollowDocument = Follow & mongoose.Document;

@Schema({ timestamps: true })
export class Follow {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    trim: true,
  })
  uid: string;

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.String],
  })
  follows: string[];
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
