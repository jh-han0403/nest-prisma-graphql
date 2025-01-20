import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @HideField()
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @HideField()
  updatedAt: Date;

  @HideField()
  deletedAt: Date;
}
