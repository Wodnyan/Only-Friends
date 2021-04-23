import { Router } from "express";
import { FRONTEND } from "../constants";
import { UserController } from "../controllers/user";
import { connection } from "../db";
import { User } from "../entities/User";
import { UserActivationCode } from "../entities/UserActivationCode";

const router = Router();

router.get("/activate", async (req, res) => {
  const { uuid, email } = req.query;
  const { em } = await connection();
  console.log(email);
  const user = await em.findOne(User, {
    email: String(email),
  });
  console.log(user);
  const code = await em.findOne(UserActivationCode, {
    code: String(uuid),
    user: {
      id: user?.id,
    },
  });
  if (!code || !user) {
    res.status(400).json({
      message: "Something went wrong",
    });
  } else {
    await UserController.activate(user.id);
    res.redirect(FRONTEND);
  }
});

export default router;
