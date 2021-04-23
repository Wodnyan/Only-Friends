import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({
    length: 100,
    unique: true,
  })
  username!: string;

  @Field()
  @Property({
    length: 300,
  })
  fullName!: string;

  @Field()
  @Property({
    length: 255,
    unique: true,
  })
  email!: string;

  @Property({
    nullable: true,
  })
  password?: string;

  @Field({ nullable: true })
  @Property({
    nullable: true,
  })
  avatar?: string;

  @Field({ nullable: true })
  @Property({
    nullable: true,
  })
  banner?: string;

  @OneToMany(() => Post, (book) => book.author)
  posts = new Collection<Post>(this);

  @Field(() => Date)
  @Property({
    type: "date",
  })
  createdAt = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();

  @Property({ default: false })
  isActivated: boolean;
}
