import { Router } from "express";

import * as authControllers from "../controllers/auth.js";

const router = Router();

router.get("/signup", authControllers.getSignup);

router.post("/signup", authControllers.postSignup);

router.get("/login", authControllers.getLogin);

router.post("/login", authControllers.postLogin);

export default router;
