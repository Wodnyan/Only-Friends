import Joi from "joi";
import { validateAsnyc } from ".";

const registerSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
  fullName: Joi.string().max(255),
});

export const validateRegisterSchema = (payload: any) => {
  return validateAsnyc(registerSchema, payload);
};
