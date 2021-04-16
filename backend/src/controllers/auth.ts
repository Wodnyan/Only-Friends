import { Encrypt } from "../utils/encrypt";
import { validateRegisterSchema } from "../validators/user";
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

// TODO: Check is email already exists
// TODO: General validation

export class AuthController {
  public static async register(credentials: SignUpCredentials) {
    try {
      await validateRegisterSchema(credentials);
      const hashedPassword = await Encrypt.encrypt(credentials.password);
      const user = await UserController.create({
        ...credentials,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      // Unique Email
      if (error.constraint === "user_email_unique") {
        const error = new Error("Email already exists");
        throw error;
        // Unique Username
      } else if (error.constraint === "user_username_unique") {
        const error = new Error("Username already exists");
        throw error;
      } else {
        console.error(error);
        throw error;
      }
    }
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
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }
    return user;
  }
}
