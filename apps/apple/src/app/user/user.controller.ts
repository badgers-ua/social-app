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
import { User } from '../shared/decorators';
import { auth } from 'firebase-admin';
import { UserService } from '../shared/providers/user/user.service';
import { UserIdParamDto } from './dto/user-id-param.dto';
import { User as UserResDto } from '@sapp/types';
import { FollowService } from './follow/follow.service';

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
    type: UserResDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'User id',
  })
  @Get()
  private searchUsers(@Query() { id }: UserIdParamDto): Promise<UserResDto> {
    return this.userService.getUserById(id);
  }

  @ApiCreatedResponse({ description: 'Created' })
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
  ): Promise<void> {
    return this.followService.follow(uid, id);
  }

  @ApiCreatedResponse({ description: 'Created' })
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

  @ApiOkResponse({ description: 'Who is user following', type: UserResDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('following')
  private whoAmIFollowing(
    @User() { uid }: auth.UserRecord
  ): Promise<UserResDto[]> {
    return this.followService.whoAmIFollowing(uid);
  }

  @ApiOkResponse({ description: 'Who is following user', type: UserResDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('followers')
  private myFollowers(@User() { uid }: auth.UserRecord): Promise<UserResDto[]> {
    return this.followService.myFollowers(uid);
  }

  @ApiOkResponse({
    description: 'Users to follow suggestions',
    type: UserResDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('suggest-whom-to-follow')
  private suggestWhomToFollow(
    @User() { uid }: auth.UserRecord
  ): Promise<UserResDto[]> {
    return this.followService.getToFollowSuggestions(uid);
  }
}
