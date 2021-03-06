import Joi from "joi";
import { validateAsnyc } from ".";

export const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).max(255).required(),
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
  fullName: Joi.string().max(255).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
});

export const validateRegisterSchema = (payload: any) => {
  return validateAsnyc(registerSchema, payload);
};
