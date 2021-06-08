import { FindConditions, getRepository, ObjectLiteral } from "typeorm";
import { Post } from "../entity/PostEntity";
import { Pagination, Order } from "../types";

type InsertArticlePayload = {
  title: string;
  description: string;
  userId: string;
};

type GetAllOptions = {
  pagination?: Pagination;
  order?: Order;
  where?:
    | string
    | ObjectLiteral
    | FindConditions<Post>
    | FindConditions<Post>[]
    | undefined;
};

class PostController {
  getAll(options?: GetAllOptions): Promise<Post[] | []> {
    return getRepository(Post).find({
      relations: ["user"],
      take: options?.pagination?.limit || 100,
      skip: options?.pagination?.offset,
      order: {
        createdAt: options?.order,
      },
      where: options?.where,
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
    const post = await this.getOne(generated.id);
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
