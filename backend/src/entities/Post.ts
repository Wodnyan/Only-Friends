import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id: string;

  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  description: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  image?: string;

  @Field(() => Date)
  @Property({
    type: "date",
  })
  createdAt = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
