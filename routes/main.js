import { Router } from "express";

import isAuth from "../middleware/is-auth.js";

import * as mainController from "../controllers/main.js";

const router = Router();

router.get("/add-contact", isAuth, mainController.getAddContact);

router.post("/add-contact", isAuth, mainController.postAddContact);

router.get("/contacts", isAuth, mainController.getContacts);

router.get("/contacts/:contactId", isAuth, mainController.getContact);

router.get("/edit-contact/:contactId", isAuth, mainController.getEditContact);

router.post("/edit-contact", isAuth, mainController.postEditContact);

export default router;
