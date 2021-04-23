import { connection } from "../db";
import { UserActivationCode } from "../entities/UserActivationCode";
import {
  ValidationError,
  ValidationException,
} from "../exceptions/ValidationException";
import { Encrypt } from "../utils/encrypt";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../validators/user";
import { UserController } from "./user";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";
import { ACTIVATION_EMAIL } from "../constants";

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

interface JoiValidationErrorDetails {
  message: string;
  context: {
    label: string;
  };
}

const joiValidationErrorToValidationErrorMap = (
  errors: JoiValidationErrorDetails[]
): ValidationError[] => {
  return errors.map(({ message, context: { label } }: any) => ({
    message,
    field: label,
  }));
};

export class AuthController {
  private static readonly connection = connection();

  public static async register(credentials: SignUpCredentials) {
    try {
      const { em } = await this.connection;
      await validateRegisterSchema(credentials);
      const hashedPassword = await Encrypt.encrypt(credentials.password);
      // TODO: Make this a transaction
      const user = await UserController.create({
        ...credentials,
        password: hashedPassword,
      });
      const activationCode = em.create(UserActivationCode, {
        user: user.id,
        code: uuidv4(),
      });
      await em.persistAndFlush(activationCode);
      await sendEmail(
        user.email,
        ACTIVATION_EMAIL(user.email, activationCode.code)
      );
      return user;
    } catch (error) {
      let errors: ValidationError[] | [] = [];
      if (error.isJoi) {
        const validationErrors = joiValidationErrorToValidationErrorMap(
          error.details
        );
        errors = [...errors, ...validationErrors];
      }
      if (error.constraint === "user_email_unique") {
        errors = [
          ...errors,
          {
            field: "email",
            message: "Email is taken",
          },
        ];
      }
      if (error.constraint === "user_username_unique") {
        errors = [
          ...errors,
          {
            field: "username",
            message: "Username is taken",
          },
        ];
      }
      if (errors.length > 0) {
        const validationError = new ValidationException(error.message, errors);
        throw validationError;
      } else {
        throw error;
      }
    }
  }

  public static async login(credentials: LoginCredentials) {
    try {
      await validateLoginSchema(credentials);
      const user = await UserController.getOneByEmail(credentials.email);
      // TODO: Check if user is activated
      if (!user) {
        throw new ValidationException("User not found", [
          {
            message: "User not found",
            field: "email",
          },
        ]);
      }
      const isPasswordCorrect = await Encrypt.verify(
        credentials.password,
        user.password!
      );
      if (!isPasswordCorrect) {
        throw new ValidationException("Incorrect password", [
          {
            message: "Incorrect password",
            field: "password",
          },
        ]);
      }
      return user;
    } catch (error) {
      if (error.isValidationError) throw error;
      else if (error.isJoi) {
        const validationErrors = joiValidationErrorToValidationErrorMap(
          error.details
        );
        throw new ValidationException(error.message, validationErrors);
      } else {
        throw error;
      }
    }
  }
}
