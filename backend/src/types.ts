import { Request, Response } from "express";
import { Session } from "express-session";

export type ApolloContext = {
  req: Request & { session: Session & { userId: string } };
  res: Response;
};

export type Order = "ASC" | "DESC";

export interface Pagination {
  limit?: number;
  offset?: number;
}
