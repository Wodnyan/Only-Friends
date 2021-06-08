import { getRepository } from "typeorm";
import { Follower as FollowerEntity } from "../entity/FollowerEntity";

export class Follower {
  async getAllFollowers(userId: string): Promise<FollowerEntity[]> {
    return await getRepository(FollowerEntity).find({
      relations: ["follower"],
      where: {
        following: {
          id: userId,
        },
      },
    });
  }

  async getAllFollowing(userId: string): Promise<FollowerEntity[]> {
    return await getRepository(FollowerEntity).find({
      relations: ["following"],
      where: {
        follower: {
          id: userId,
        },
      },
    });
  }

  async follow(userId: string, followingId: string): Promise<boolean> {
    await getRepository(FollowerEntity).insert({
      follower: {
        id: userId,
      },
      following: {
        id: followingId,
      },
    });
    return true;
  }

  async unfollow(userId: string, followingId: string): Promise<boolean> {
    const deleted = await getRepository(FollowerEntity).delete({
      follower: {
        id: userId,
      },
      following: {
        id: followingId,
      },
    });
    return Boolean(deleted);
  }
}

export const followerController = new Follower();
