import {
  Arg,
  Args,
  Ctx,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Field,
} from "type-graphql";
import { LoginArgs, RegisterArgs, UpdateUserArgs } from "../args/user";
import { SESSION_COOKIE_NAME } from "../constants";
import { AuthController } from "../controllers/auth";
import { UserController } from "../controllers/user";
import { User } from "../entities/User";
import { ValidationError } from "../graphql-objects/errors";
import { Context } from "../type";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
class UserResponse {
  @Field(() => [ValidationError], { nullable: true })
  validationErrors?: ValidationError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

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

  @Mutation(() => UserResponse)
  async register(
    @Args() credentials: RegisterArgs,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await AuthController.register(credentials);
      (req.session as any).userId = user.id;
      // TODO: create uuid
      const uniqueId = uuidv4();
      console.log(uniqueId);

      await sendEmail(
        user.email,
        `
          <h1>Click the link to activate your account</h1>
          <a href=${
            "http://localhost:5050/api/v1/users/activate?uuid=" + uniqueId
          }>Activation Link</a>
        `
      );
      return { user };
    } catch (error) {
      if (error.isValidationError) {
        return {
          validationErrors: error.errors,
        };
      }
      throw error;
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) => {
      res.clearCookie(SESSION_COOKIE_NAME);
      req.session.destroy((error) => {
        return resolve(error === undefined);
      });
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Args() credentials: LoginArgs,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await AuthController.login(credentials);
      (req.session as any).userId = user.id;
      return { user };
    } catch (error) {
      if (error.isValidationError) {
        return {
          validationErrors: error.errors,
        };
      }
      throw error;
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
