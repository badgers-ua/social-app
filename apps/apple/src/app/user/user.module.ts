import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FollowModule } from './follow/follow.module';
import { UserServiceModule } from '../shared/providers/user/user-service.module';

@Module({
  imports: [FollowModule, UserServiceModule],
  controllers: [UserController],
})
export class UserModule {}
