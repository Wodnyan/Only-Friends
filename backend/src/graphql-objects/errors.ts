import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ValidationError {
  @Field()
  field: string;

  @Field()
  message: string;
}
