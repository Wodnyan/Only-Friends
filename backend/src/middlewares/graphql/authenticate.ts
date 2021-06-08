import { MiddlewareFn } from "type-graphql";
import { ApolloContext } from "../../types";

export const Authenticate: MiddlewareFn<ApolloContext> = (action, next) => {
  if (!(action.context.req.session as any).userId) {
    throw new Error("Unauthenticated");
  }
  return next();
};
