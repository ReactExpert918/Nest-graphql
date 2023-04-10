import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class GetTracksInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  artistName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  genreName?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsInt()
  @Min(0)
  page?: number;

  @Field(() => Number, { nullable: true, defaultValue: 10 })
  @IsNumber()
  @IsInt()
  @Min(1)
  pageSize?: number;
}
