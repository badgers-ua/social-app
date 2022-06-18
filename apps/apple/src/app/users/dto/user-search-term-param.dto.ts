import { IsString } from 'class-validator';

export class UserSearchTermParamDto {
  @IsString()
  public readonly term: string;
}
