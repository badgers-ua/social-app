import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from '../../shared/schemas/follow.schema';
import { UsersServiceModule } from '../../shared/providers/users/users-service.module';

const followModel = { name: Follow.name, schema: FollowSchema };

@Module({
  imports: [MongooseModule.forFeature([followModel]), UsersServiceModule],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
