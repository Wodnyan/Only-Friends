import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { followerController } from "../controllers/Follower";
import { User } from "../entity/UserEntity";
import { Authenticate } from "../middlewares/graphql/authenticate";
import { ApolloContext } from "../types";

@Resolver()
export class FollowerResolver {
  @UseMiddleware(Authenticate)
  @Query(() => [User])
  async followers(@Ctx() { req }: ApolloContext) {
    const { userId } = req.session as any;
    const followers = await followerController.getAllFollowers(userId);
    return followers.map((follower) => follower.follower);
  }

  @UseMiddleware(Authenticate)
  @Query(() => [User])
  async following(@Ctx() { req }: ApolloContext) {
    const { userId } = req.session as any;
    const following = await followerController.getAllFollowing(userId);
    return following.map((following) => following.following);
  }

  @UseMiddleware(Authenticate)
  @Mutation(() => Boolean)
  async follow(
    @Ctx() { req }: ApolloContext,
    @Arg("followingId") followingId: string
  ) {
    const { userId } = req.session as any;
    const follow = await followerController.follow(userId, followingId);
    return follow;
  }

  @UseMiddleware(Authenticate)
  @Mutation(() => Boolean)
  async unfollow(
    @Ctx() { req }: ApolloContext,
    @Arg("followingId") followingId: string
  ) {
    const { userId } = req.session as any;
    const unfollow = await followerController.unfollow(userId, followingId);
    return unfollow;
  }
}
