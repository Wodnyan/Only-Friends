import { Resolver, Query, Mutation, Args, Ctx, Arg } from "type-graphql";
import { CreatePostArgs } from "../args/post";
import { PostController } from "../controllers/post";
import { Post } from "../entities/Post";
import { Context } from "../type";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[] | []> {
    const posts = await PostController.getAll();
    return posts;
  }

  @Query(() => Post)
  async post(@Arg("id") id: number): Promise<Post | null> {
    const post = await PostController.getOne(id);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Args() data: CreatePostArgs,
    @Ctx() { req }: Context
  ): Promise<Post | null> {
    const { userId } = req.session as any;
    // TODO: Throw an error
    if (!userId) {
      return null;
    }
    const post = await PostController.create(data, userId);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number, @Ctx() { req }: Context) {
    const { userId } = req.session as any;
    // TODO: Throw an error
    if (!userId) {
      return null;
    }
    return PostController.delete(id);
  }
}
