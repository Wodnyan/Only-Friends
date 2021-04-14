import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RegisterArgs {
  @Field()
  username: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ArgsType()
export class UpdateUserArgs {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  banner?: string;

  @Field({ nullable: true })
  avatar?: string;
}

@ArgsType()
export class LoginArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
