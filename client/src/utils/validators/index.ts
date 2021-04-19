import { useCallback } from "react";
import { Schema } from "joi";

export const validateAsnyc = async (schema: Schema, payload: any) => {
  const temp = await schema.validateAsync(payload, {
    abortEarly: false,
  });
  return temp;
};
export const useYupValidationResolver = (validationSchema: Schema) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validateAsync(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.details.reduce(
            (allErrors: any, { message, context: { label } }: any) => ({
              ...allErrors,
              [label]: {
                type: "validation",
                message,
              },
            }),
            []
          ),
        };
      }
    },
    [validationSchema]
  );
