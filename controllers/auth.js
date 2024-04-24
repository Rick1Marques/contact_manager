import User from "../models/user.js";

export const getSignup = async (req, res) => {
  res.render("auth/signup");
};

export const postSignup = async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
