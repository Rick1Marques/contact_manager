import { Router } from "express";

const router = Router();

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

export default router;
