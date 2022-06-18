import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePostReqDto } from './dto/create-post-req.dto';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { User } from '../shared/decorators';
import { auth } from 'firebase-admin';
import { PostDocument } from '../shared/schemas/post.schema';
import { UpdatePostReqDto } from './dto/update-post-req.dto';
import { PostIdParamDto } from './dto/post-id-param.dto';
import { POST_CRUD_ERROR_MSG } from './_constants';

@ApiBearerAuth()
@ApiTags('Post')
@UseGuards(FirebaseAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiCreatedResponse({ description: 'Created post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  private createPost(
    @Body() createCatDto: CreatePostReqDto,
    @User() { uid }: auth.UserRecord
  ): Promise<void> {
    return this.postService.createPost(createCatDto, uid);
  }

  @ApiCreatedResponse({ description: 'Updated post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: POST_CRUD_ERROR_MSG,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of a post',
  })
  @Patch('update/:id')
  private async updatePost(
    @Body() updateCatDto: UpdatePostReqDto,
    @Param() { id }: PostIdParamDto,
    @User() { uid }: auth.UserRecord
  ): Promise<void | never> {
    return this.postService.updatePost(id, updateCatDto, uid);
  }

  @ApiCreatedResponse({ description: 'Delete post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: POST_CRUD_ERROR_MSG,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of a post',
  })
  @Delete('delete/:id')
  private async deletePost(
    @Param() { id }: PostIdParamDto,
    @User() { uid }: auth.UserRecord
  ): Promise<void> {
    return this.postService.deletePost(id, uid);
  }
}
