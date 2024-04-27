import Contact from "../models/contact.js";

export const getAddContact = (req, res) => {
  res.render("main/add-contact", {
    pageTitle: "Add Contact",
  });
};

export const postAddContact = async (req, res) => {
  const contact = new Contact({ ...req.body, userId: req.user._id });
  await contact.save();
  res.redirect("/contacts");
};

export const getContacts = async (req, res) => {
  const contactList = await Contact.find({ userId: req.user._id });
  res.render("main/contacts", {
    pageTitle: "Contacts",
    contactList: contactList,
  });
};

export const getContact = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);
  res.render("main/contact-detail", {
    pageTitle: "Contact",
    contact: contact,
  });
};
