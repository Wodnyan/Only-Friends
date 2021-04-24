export const __prod__ = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT || 5050;

export const SESSION_COOKIE_NAME = "qid";

export const ACTIVATION_EMAIL = (email: string, code: string) => `
  <a href="http://localhost:5050/api/v1/users/activate?email=${email}&uuid=${code}">Activation Link</a>
`;

export const FRONTEND = "http://localhost:3000";
