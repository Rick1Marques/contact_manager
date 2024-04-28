import User from "../models/user.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const getSignup = async (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    errorMessage: null,
    oldInput: {
      name: "",
      password: "",
    },
  });
};

export const postSignup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          name: name,
          password: password,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name: name, password: hashedPassword });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login",
    errorMessage: null,
    oldInput: {
      name: "",
      password: "",
    },
  });
};

export const postLogin = async (req, res) => {
  const { name, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      pageTitle: "login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        name: name,
        password: password,
      },
    });
  }

  let user = await User.findOne({ name: name });
  if (!user) {
    return res.redirect("/login");
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (doMatch) {
    console.log("good pass");
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    return res.redirect("/");
  }
  console.log("No good");
  res.redirect("/login");
};
