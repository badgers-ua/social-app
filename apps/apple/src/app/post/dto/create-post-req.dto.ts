import { IsString, MaxLength } from 'class-validator';
import { POST_MAX_LENGTH } from '../_constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostReqDto {
  @ApiProperty({
    description: 'Content of a Post',
    maxLength: POST_MAX_LENGTH,
    type: String,
  })
  @IsString()
  @MaxLength(POST_MAX_LENGTH)
  public readonly text: string;
}
