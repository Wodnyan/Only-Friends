import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { RegisterArgs, UpdateUserArgs } from "../args/user";
import { User } from "../entities/User";
import { Context } from "../type";
import { Encrypt } from "../utils/encrypt";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: Context): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    return em.findOne(User, {
      id,
    });
  }

  @Mutation(() => User)
  async register(
    @Args() credentials: RegisterArgs,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    const hashedPassword = await Encrypt.encrypt(credentials.password);
    const user = em.create(User, {
      ...credentials,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Args() update: UpdateUserArgs,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (update.fullName) {
      user.fullName = update.fullName;
    }
    if (update.avatar) {
      user.avatar = update.avatar;
    }
    if (update.banner) {
      user.banner = update.banner;
    }
    await em.flush();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number, @Ctx() { em }: Context) {
    try {
      await em.nativeDelete(User, { id });
      return true;
    } catch (_) {
      return false;
    }
  }
}
