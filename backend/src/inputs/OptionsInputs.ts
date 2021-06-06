import { Field, InputType } from "type-graphql";
import { Order, Pagination } from "../types";

@InputType()
export class OptionsInput implements Pagination {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  offset?: number;

  @Field({ nullable: true })
  order?: Order;
}
