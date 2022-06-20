import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth/firebase-auth-guard';
import { auth } from 'firebase-admin';
import { UsersService } from '../shared/providers/users/users.service';
import { UserSearchTermParamDto } from './dto/user-search-term-param.dto';
import { User } from '../shared/decorators';
import { User as UserResDto } from '@sapp/types';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Users matched search term',
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'term',
    type: 'string',
    description: 'Search term',
  })
  @Get()
  private searchUsers(
    @Query() { term }: UserSearchTermParamDto,
    @User() { uid }: auth.UserRecord
  ): Promise<UserResDto[]> {
    return this.usersService.getUsers(term, uid);
  }
}
