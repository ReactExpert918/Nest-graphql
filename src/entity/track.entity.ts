import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  duration: number;

  @Field()
  genre: string;
}
