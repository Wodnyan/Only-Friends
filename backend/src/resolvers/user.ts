import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { LoginArgs, RegisterArgs, UpdateUserArgs } from "../args/user";
import { AuthController } from "../controllers/auth";
import { UserController } from "../controllers/user";
import { User } from "../entities/User";
import { Context } from "../type";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserController.getAll();
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | null> {
    const user = await UserController.getOne(id);
    return user;
  }

  @Mutation(() => User)
  async register(
    @Args() credentials: RegisterArgs,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    const user = await AuthController.register(credentials);
    (req.session as any).userId = user.id;
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Args() credentials: LoginArgs,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    try {
      const user = await AuthController.login(credentials);
      (req.session as any).userId = user.id;
      return user;
    } catch (error) {
      console.log("Login Error", error);
      return null;
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    const { userId } = req.session as any;
    // User not logged in
    if (!userId) {
      return null;
    }
    const user = await UserController.getOne(userId);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Args() update: UpdateUserArgs
  ): Promise<User | null> {
    return UserController.update(id, update);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    return UserController.delete(id);
  }
}
