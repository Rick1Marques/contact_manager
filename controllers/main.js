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

export const getEditContact = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);
  res.render("main/edit-contact", {
    pageTitle: "Edit Contact",
    contact: contact,
  });
};

export const postEditContact = async (req, res) => {
  const {
    contactId,
    name: nameUpdated,
    surname: surnameUpdated,
    type: typeUpdated,
    group: groupUpdated,
    telefon: telefonUpdated,
    email: emailUpdated,
  } = req.body;
  const contact = await Contact.findById(contactId);
  contact.name = nameUpdated;
  contact.surname = surnameUpdated;
  contact.type = typeUpdated;
  contact.group = groupUpdated;
  contact.telefon = telefonUpdated;
  contact.email = emailUpdated;
  await contact.save();
  console.log("Contact updated!");
  res.redirect("/contacts");
};

export const postDeleteContact = async (req, res) => {
  const contactId = req.body.contactId;
  await Contact.deleteOne({ _id: contactId });
  console.log("Contact deleted!");
  res.redirect("/contacts");
};
