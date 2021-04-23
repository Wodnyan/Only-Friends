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
