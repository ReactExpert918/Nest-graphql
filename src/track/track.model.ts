import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field(() => Int)
  duration: number;

  @Field()
  genre: string;

  @Field()
  artistId: number;
}
