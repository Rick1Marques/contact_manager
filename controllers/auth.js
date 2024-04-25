import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getSignup = async (req, res) => {
  res.render("auth/signup");
};

export const postSignup = async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name: name });
    if (user) {
      res.redirect("/signup");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({ name: name, password: hashedPassword });
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = (req, res) => {
  res.render("auth/login");
};

export const postLogin = async (req, res) => {
  const { name, password } = req.body;
  let user = await User.findOne({ name: name });
  if (!user) {
    res.redirect("/login");
  }
  const doMatch = await bcrypt.compare(password, user.password);
  if (doMatch) {
    console.log("good pass");
    res.redirect("/");
  }
  console.log("No good");
  res.redirect("/login");
};
