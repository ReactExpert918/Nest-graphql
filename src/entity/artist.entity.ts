import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
