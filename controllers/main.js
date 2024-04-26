import Contact from "../models/contact.js";

export const getAddContact = (req, res) => {
  res.render("main/add-contact");
};

export const postAddContact = async (req, res) => {
  const contact = new Contact({ ...req.body, userId: req.user._id });
  await contact.save();
  res.redirect("/contacts");
};

export const getContacts = async (req, res) => {
  const contactList = await Contact.find({ userId: req.user._id });
  res.render("main/contacts", {
    contactList: contactList,
  });
};
