import { connection } from "../db";
import { Post } from "../entities/Post";

interface CreatePost {
  title: string;
  description: string;
  image?: string;
}

interface DefaultOptions {
  limit?: number;
  offset?: number;
}

interface GetAllOptions extends DefaultOptions {
  authorId?: number;
}

export class PostController {
  private static connection = connection();

  public static async getAll(options?: GetAllOptions) {
    const { em } = await this.connection;
    const postRepository = em.getRepository(Post);
    if (options?.authorId) {
      return postRepository.find(
        { author: options.authorId },
        ["author"],
        undefined,
        options.limit,
        options.offset
      );
    }
    return postRepository.findAll(
      ["author"],
      undefined,
      options?.limit,
      options?.offset
    );
  }

  public static async getOne(id: number) {
    const { em } = await this.connection;
    const postRepository = em.getRepository(Post);
    return postRepository.findOne(
      {
        id,
      },
      ["author"]
    );
  }

  public static async create(
    { description, title, image }: CreatePost,
    authorId: number
  ) {
    const { em } = await this.connection;
    const post = em.create(Post, {
      description,
      image,
      title,
      author: authorId,
    });
    await em.persistAndFlush(post);
    return post;
  }

  public static async delete(id: number) {
    const { em } = await this.connection;
    await em.nativeDelete(Post, { id });
    return true;
  }
}
