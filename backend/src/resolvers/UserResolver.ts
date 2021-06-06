import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entity/UserEntity";
import { ApolloContext } from "../types";
import userController from "../controllers/User";
import { Like } from "typeorm";
import { OptionsInput } from "../inputs/OptionsInputs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(
    @Ctx() { req }: ApolloContext,
    @Arg("username", { nullable: true }) username?: string,
    @Arg("options", { nullable: true }) options?: OptionsInput
  ): Promise<[] | User[]> {
    if (!(req.session as any).userId) {
      throw new Error("Unauthenticated");
    }
    return userController.getAll({
      where: {
        username: Like(`%${username || ""}%`),
      },
      order: options?.order,
      pagination: {
        limit: options?.limit,
        offset: options?.offset,
      },
    });
  }
}
