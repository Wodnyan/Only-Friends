import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { postController } from "../controllers/Post";
import { Post } from "../entity/PostEntity";
import { InsertPostInput } from "../inputs/PostInputs";
import { ApolloContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  public async articles(): Promise<Post[] | []> {
    return postController.getAll();
  }

  @Query(() => Post)
  public async article(@Arg("id") id: string): Promise<Post | null> {
    return (await postController.getOne(id)) || null;
  }

  @Mutation(() => Boolean)
  public async deleteArticle(
    @Arg("id") id: string,
    @Ctx() { req }: ApolloContext
  ) {
    const deleted = await postController.delete(
      id,
      (req.session as any).userId
    );
    return Boolean(deleted);
  }

  @Mutation(() => Post, { nullable: true })
  public async createArticle(
    @Arg("article") article: InsertPostInput,
    @Ctx() { req }: ApolloContext
  ): Promise<Post | null> {
    return postController.insert({
      ...article,
      userId: (req.session as any).userId,
    });
  }
}
