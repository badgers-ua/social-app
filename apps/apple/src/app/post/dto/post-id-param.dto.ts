import { IsMongoId } from 'class-validator';

export class PostIdParamDto {
  @IsMongoId()
  public readonly id: string;
}
