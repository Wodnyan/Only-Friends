import { Router } from "express";

const router = Router();

router.get("/activate", (req, res) => {
  const { uuid } = req.query;
  // TODO: Check if code exists
  // TODO: Activate account
  console.log(uuid);
  res.redirect("/");
});

export default router;
