import { connection } from "../db";
import { User } from "../entities/User";

interface Update {
  fullName?: string;
  banner?: string;
  avatar?: string;
}

interface CreateUser {
  fullName: string;
  email: string;
  username: string;
  password?: string;
}

export class UserController {
  static connection = connection();

  public static async getAll() {
    const { em } = await this.connection;
    return em.find(User, { isActivated: true });
  }

  public static async getOne(id: number) {
    const { em } = await this.connection;
    return em.findOne(User, { id, isActivated: true });
  }

  public static async getOneByEmail(email: string) {
    const { em } = await this.connection;
    return em.findOne(User, { email, isActivated: true });
  }

  public static async create(data: CreateUser) {
    const { em } = await this.connection;
    const user = em.create(User, data);
    await em.persistAndFlush(user);
    return user;
  }

  public static async delete(id: number) {
    try {
      const { em } = await this.connection;
      await em.nativeDelete(User, { id });
      return true;
    } catch (_) {
      return false;
    }
  }

  public static async activate(id: number) {
    const { em } = await this.connection;
    const user = await em.findOne(User, { id });
    if (user) {
      user.isActivated = true;
    } else {
      throw new Error("No user found");
    }
    await em.flush();
    return user;
  }

  public static async update(id: number, update: Update) {
    const { em } = await this.connection;
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (update.fullName) {
      user.fullName = update.fullName;
    }
    if (update.avatar) {
      user.avatar = update.avatar;
    }
    if (update.banner) {
      user.banner = update.banner;
    }
    await em.flush();
    return user;
  }
}
