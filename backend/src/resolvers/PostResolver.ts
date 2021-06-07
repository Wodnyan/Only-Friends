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
import { InsertPostInput } from "../inputs/PostInputs";
import { Authenticate } from "../middlewares/graphql/authenticate";
import { ApolloContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  public async posts(): Promise<Post[] | []> {
    return postController.getAll();
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
    const deleted = await postController.delete(
      id,
      (req.session as any).userId
    );
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
      userId: (req.session as any).userId,
    });
  }
}
