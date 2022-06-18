import { IsString } from 'class-validator';

export class UserIdParamDto {
  @IsString()
  public readonly id: string;
}
