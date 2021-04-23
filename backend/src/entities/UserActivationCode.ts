import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserActivationCode {
  @Field()
  @PrimaryKey()
  id!: number;

  @Property()
  code: string;

  @Field(() => User)
  @OneToOne(() => User)
  user!: User;

  @Field(() => Date)
  @Property({
    type: "date",
  })
  createdAt = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
