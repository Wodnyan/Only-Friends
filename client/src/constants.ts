export const __prod__ = process.env.NODE_ENV === "production";

export const GRAPHQL_ENDPOINT =
  process.env.BACKEND_ROUTE || "http://localhost:5050/graphql";
