import { Schema } from "joi";

export const validateAsnyc = async (schema: Schema, payload: any) => {
  const temp = await schema.validateAsync(payload, {
    abortEarly: false,
  });
  return temp;
};
