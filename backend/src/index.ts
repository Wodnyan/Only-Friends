import "reflect-metadata";
import UserController from "./controllers/User";
import { dbConnection } from "./db";

(async () => {
  await dbConnection();
  const foo = await UserController.insert({
    email: "hello1@kasjlfaworld",
    password: "foobar12",
    username: "hfsalkfjalelo12414",
  });
  console.log(foo);
  console.log("App Running");
})().catch(console.error);
