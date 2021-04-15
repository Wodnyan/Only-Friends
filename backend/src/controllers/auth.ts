import { Encrypt } from "../utils/encrypt";
import { UserController } from "./user";

interface SignUpCredentials {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthController {
  public static async register(credentials: SignUpCredentials) {
    const hashedPassword = await Encrypt.encrypt(credentials.password);
    const user = await UserController.create({
      ...credentials,
      password: hashedPassword,
    });
    return user;
  }

  public static async login(credentials: LoginCredentials) {
    const user = await UserController.getOneByEmail(credentials.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await Encrypt.verify(
      credentials.password,
      user.password!
    );
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }
    return user;
  }
}
