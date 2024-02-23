const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    await Contact.create(response);
    return res.status(200).json({ msg: "contactForm Created Successfully" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = {
  contactForm,
};
