import { Field, InputType } from "type-graphql";
import { User } from "../entity/UserEntity";

@InputType()
export class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
