import { Field, InputType } from "type-graphql";
import { Post } from "../entity/PostEntity";

@InputType()
export class InsertPostInput implements Partial<Post> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;
}
