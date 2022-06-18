import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Follow, FollowSchema } from '../../shared/schemas/follow.schema';
import { MongooseModule } from '@nestjs/mongoose';

const followModel = { name: Follow.name, schema: FollowSchema };

@Module({
  imports: [MongooseModule.forFeature([followModel])],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
