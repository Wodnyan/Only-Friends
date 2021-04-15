import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  title: string;

  @Field()
  @Property()
  description: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  image?: string;

  @Field(() => User)
  @ManyToOne(() => User)
  author!: User;

  @Field(() => Date)
  @Property({
    type: "date",
  })
  createdAt = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
