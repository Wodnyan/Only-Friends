import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { postController } from "../controllers/Post";
import { Post } from "../entity/PostEntity";
import { OptionsInput } from "../inputs/OptionsInputs";
import { InsertPostInput } from "../inputs/PostInputs";
import { Authenticate } from "../middlewares/graphql/authenticate";
import { ApolloContext } from "../types";

@Resolver()
export class PostResolver {
  /*
   * If following is true and user is authenticated
   * than respond with only the posts of users which
   * the user follows
   *
   */
  @UseMiddleware(Authenticate)
  @Query(() => [Post])
  public async followingPosts(
    @Ctx() { req }: ApolloContext,
    @Arg("options", { nullable: true }) options?: OptionsInput,
    @Arg("userId", { nullable: true }) userId?: string
  ) {
    console.log(req.session.userId);
    return await postController.getAll({
      order: options?.order,
      pagination: {
        limit: options?.limit,
        offset: options?.offset,
      },
      where: userId
        ? {
            user: {
              id: userId || null,
            },
          }
        : undefined,
    });
  }

  @Query(() => [Post])
  public async posts(
    @Arg("options", { nullable: true }) options?: OptionsInput,
    @Arg("userId", { nullable: true }) userId?: string
  ): Promise<Post[] | []> {
    return await postController.getAll({
      order: options?.order,
      pagination: {
        limit: options?.limit,
        offset: options?.offset,
      },
      where: userId
        ? {
            user: {
              id: userId || null,
            },
          }
        : undefined,
    });
  }

  @Query(() => Post, { nullable: true })
  public async post(@Arg("id") id: string): Promise<Post | null> {
    return (await postController.getOne(id)) || null;
  }

  @UseMiddleware(Authenticate)
  @Mutation(() => Boolean)
  public async deletePost(
    @Arg("id") id: string,
    @Ctx() { req }: ApolloContext
  ) {
    const deleted = await postController.delete(id, req.session.userId);
    return Boolean(deleted);
  }

  @UseMiddleware(Authenticate)
  @Mutation(() => Post, { nullable: true })
  public async createPost(
    @Arg("post") post: InsertPostInput,
    @Ctx() { req }: ApolloContext
  ): Promise<Post | null> {
    return postController.insert({
      ...post,
      userId: req.session.userId,
    });
  }
}
