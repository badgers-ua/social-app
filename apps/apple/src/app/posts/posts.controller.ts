import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { PostsService } from './posts.service';
import { User } from '../shared/decorators';
import { auth } from 'firebase-admin';
import { Post as PostResDto } from '@sapp/types';
@ApiBearerAuth()
@ApiTags('Posts')
@UseGuards(FirebaseAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    description: 'Posts from followed users',
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  private getFollowedUsersPosts(
    @User() { uid }: auth.UserRecord
  ): Promise<PostResDto[]> {
    return this.postsService.getFollowedUsersPosts(uid);
  }

  @ApiOkResponse({
    description: 'Posts created by user',
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('my')
  private getMyPosts(@User() { uid }: auth.UserRecord): Promise<PostResDto[]> {
    return this.postsService.getMyPosts(uid);
  }
}
