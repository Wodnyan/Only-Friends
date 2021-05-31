import { getRepository } from "typeorm";
import { Post } from "../entity/PostEntity";

type InsertArticlePayload = {
  title: string;
  description: string;
  userId: string;
};

class PostController {
  getAll(): Promise<Post[] | []> {
    return getRepository(Post).find({
      relations: ["user"],
    });
  }

  getOne(id: string): Promise<Post | undefined> {
    return getRepository(Post).findOne({
      where: {
        id,
      },
      relations: ["user"],
    });
  }

  async insert(payload: InsertArticlePayload): Promise<Post> {
    const {
      raw: [generated],
    } = await getRepository(Post).insert({
      ...payload,
      user: {
        id: payload.userId,
      },
    });
    const post = await getRepository(Post).findOne(generated.id, {
      relations: ["user"],
    });
    return post!;
  }

  async delete(id: string, userId: string) {
    console.log(userId);
    const temp = await getRepository(Post).delete({
      id,
    });
    console.log(
      "🚀 ~ file: Article.ts ~ line 47 ~ ArticleController ~ temp ~ temp",
      temp
    );
    return temp;
  }
}

export const postController = new PostController();
