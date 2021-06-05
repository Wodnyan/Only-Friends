import { FindConditions, getRepository, ObjectLiteral } from "typeorm";
import { User } from "../entity/UserEntity";

type InsertPayload = {
  username: string;
  password: string;
  email: string;
  fullName: string;
};

type UserUpdate = {
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
};

type Options = {
  limit?: number;
  offset?: number;
  order?: "ASC" | "DESC";
  where?:
    | string
    | ObjectLiteral
    | FindConditions<User>
    | FindConditions<User>[]
    | undefined;
};

interface UserControllerInterface {
  getAll(options?: Options): Promise<User[]>;

  getOne(id: string): Promise<User | undefined>;

  insert(payload: InsertPayload): Promise<User>;

  delete(id: string): void;

  update(update: UserUpdate): Promise<User>;
}

// TODO: Add pagination
export class UserController implements UserControllerInterface {
  getAll(options?: Options) {
    return getRepository(User).find({
      take: options?.limit || 100,
      skip: options?.offset,
      order: {
        id: options?.order,
      },
      where: options?.where,
    });
  }

  getOne(id: string) {
    return getRepository(User).findOne({
      where: {
        id,
      },
    });
  }

  getOneByUsername(username: string) {
    return getRepository(User).findOne({
      where: {
        username,
      },
    });
  }

  async insert(payload: InsertPayload): Promise<User> {
    const {
      raw: [generated],
    } = await getRepository(User).insert(payload);
    return {
      ...generated,
      ...payload,
    };
  }

  delete(id: string) {
    return getRepository(User).delete({
      id,
    });
  }

  update(update: UserUpdate) {
    return getRepository(User).save(update);
  }
}

export default new UserController();
