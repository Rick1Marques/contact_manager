import { Router } from "express";

import isAuth from "../middleware/is-auth.js";

import * as mainController from "../controllers/main.js";

const router = Router();

router.get("/add-contact", isAuth, mainController.getAddContact);

export default router;
