import { Router } from "express";

import * as authControllers from "../controllers/auth.js";

import { check } from "express-validator";

import User from "../models/user.js";

const router = Router();

router.get("/signup", authControllers.getSignup);

router.post(
  "/signup",
  [
    check("password").isLength({ min: 6 }).withMessage("The password must have min 6 char!"),
    check("name")
      .isAlphanumeric()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ name: value });
        if (user) {
          return Promise.reject("Name exists already.");
        }
      }),
  ],
  authControllers.postSignup
);

router.get("/login", authControllers.getLogin);

router.post(
  "/login",
  [
    check("password").isLength({ min: 6 }).withMessage("The password must have min 6 char!"),
    check("name").isAlphanumeric(),
  ],
  authControllers.postLogin
);

export default router;
