import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import userController from "../controllers/User";
import { User } from "../entity/UserEntity";
import { RegisterUserInput } from "../inputs/UserInputs";
import { ApolloContext } from "../types";
import { hash } from "../utils/hash";

@Resolver()
export class AuthResolver {
  // Login
  // Logout
  // Me
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: ApolloContext): Promise<User | null> {
    return (await userController.getOne((req.session as any).userId)) || null;
  }
  // Register
  @Mutation(() => User)
  async register(
    @Arg("user") userInput: RegisterUserInput,
    @Ctx() { req }: ApolloContext
  ): Promise<User> {
    const hashedPassword = await hash.hash(userInput.password);
    const user = await userController.insert({
      ...userInput,
      password: hashedPassword,
    });
    (req.session as any).userId = user.id;
    return user;
  }
}
