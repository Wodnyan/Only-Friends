import { Request, Response } from "express";

export type ApolloContext = {
  req: Request;
  res: Response;
};

export type Order = "ASC" | "DESC";

export interface Pagination {
  limit?: number;
  offset?: number;
}
