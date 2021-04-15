import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreatePostArgs {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  image?: string;
}
