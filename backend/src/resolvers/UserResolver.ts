import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/UserEntity";
import userController from "../controllers/User";
import { Like } from "typeorm";
import { OptionsInput } from "../inputs/OptionsInputs";
import { Authenticate } from "../middlewares/graphql/authenticate";

@Resolver()
export class UserResolver {
  @UseMiddleware(Authenticate)
  @Query(() => [User])
  async users(
    @Arg("username", { nullable: true }) username?: string,
    @Arg("options", { nullable: true }) options?: OptionsInput
  ): Promise<[] | User[]> {
    return await userController.getAll({
      where: {
        username: Like(`${username || ""}%`),
      },
      order: options?.order,
      pagination: {
        limit: options?.limit,
        offset: options?.offset,
      },
    });
  }
  @UseMiddleware(Authenticate)
  @Query(() => User, { nullable: true })
  async user(@Arg("id") userId: string): Promise<User | null> {
    return (await userController.getOne(userId)) || null;
  }
}
