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
