import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import userController from "../controllers/User";
import { User } from "../entity/UserEntity";
import { LoginUserInput, RegisterUserInput } from "../inputs/UserInputs";
import { ApolloContext } from "../types";
import { hash } from "../utils/hash";

@Resolver()
export class AuthResolver {
  // Login
  @Mutation(() => User)
  async login(
    @Ctx() { req }: ApolloContext,
    @Arg("user") userInput: LoginUserInput
  ): Promise<User> {
    const user = await userController.getOneByUsername(userInput.username);
    if (!user) {
      throw new Error("No user found");
    }

    const correctPassword = await hash.compare(
      user.password,
      userInput.password
    );

    if (!correctPassword) {
      throw new Error("Incorrect password");
    }

    (req.session as any).userId = user.id;

    return user;
  }
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
