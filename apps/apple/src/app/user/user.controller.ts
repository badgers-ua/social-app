import { Get, Controller, Patch, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { FollowService } from './follow/follow.service';
import { User } from '../shared/decorators';
import { auth } from 'firebase-admin';
import { FollowDocument } from '../shared/schemas/follow.schema';
import { UserService } from '../shared/providers/user/user.service';
import { UserIdParamDto } from './dto/user-id-param.dto';
import { User as UserResDto } from '@sapp/types';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(FirebaseAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly followService: FollowService,
    private readonly userService: UserService
  ) {}

  @ApiOkResponse({
    description: 'User',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'User id',
  })
  @Get()
  private searchUsers(
    @Query() { id }: UserIdParamDto
  ): Promise<auth.UserRecord> {
    return this.userService.getUserById(id);
  }

  @ApiCreatedResponse({ description: 'Who is user following' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'User to follow',
  })
  @Patch('follow')
  private follow(
    @Query() { id }: UserIdParamDto,
    @User() { uid }: auth.UserRecord
  ): Promise<FollowDocument> {
    return this.followService.follow(uid, id);
  }

  @ApiCreatedResponse({ description: 'Who is user following' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'User to unfollow',
  })
  @Patch('unfollow')
  private unfollow(
    @Query() { id }: UserIdParamDto,
    @User() { uid }: auth.UserRecord
  ): Promise<void> {
    return this.followService.unfollow(uid, id);
  }

  @ApiOkResponse({ description: 'Who is user following' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('following')
  private whoAmIFollowing(
    @User() { uid }: auth.UserRecord
  ): Promise<UserResDto[]> {
    return this.followService.whoAmIFollowing(uid);
  }

  @ApiOkResponse({ description: 'Who is following user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('followers')
  private myFollowers(@User() { uid }: auth.UserRecord): Promise<UserResDto[]> {
    return this.followService.myFollowers(uid);
  }
}
