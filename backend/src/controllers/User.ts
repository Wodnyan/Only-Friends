import { getRepository } from "typeorm";
import { User } from "../entity/UserEntity";

type InsertPayload = {
  username: string;
  password: string;
  email: string;
};

type UserUpdate = {
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
};

interface UserControllerInterface {
  getAll(): Promise<User[]>;

  getOne(id: string): Promise<User | undefined>;

  insert(payload: InsertPayload): Promise<User>;

  delete(id: string): void;

  update(update: UserUpdate): Promise<User>;
}

export class UserController implements UserControllerInterface {
  getAll() {
    return getRepository(User).find();
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
      email: payload.email,
      username: payload.password,
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
