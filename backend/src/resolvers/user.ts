import { Arg, Args, Int, Mutation, Query, Resolver } from "type-graphql";
import { LoginArgs, RegisterArgs, UpdateUserArgs } from "../args/user";
import { AuthController } from "../controllers/auth";
import { UserController } from "../controllers/user";
import { User } from "../entities/User";

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
  async register(@Args() credentials: RegisterArgs): Promise<User | null> {
    const user = await AuthController.register(credentials);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Args() credentials: LoginArgs): Promise<User | null> {
    try {
      const user = await AuthController.login(credentials);
      return user;
    } catch (error) {
      console.log("Login Error", error);
      return null;
    }
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
