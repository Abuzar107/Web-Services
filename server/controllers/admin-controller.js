const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//for deleteing the user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted SuccessFully" });
  } catch (error) {
    next(error);
  }
};

//for updating the user
const updateUser = async (req, res) => {
  try {
    const { username, email, phone, id } = req.body;
    if (!username || !email || !phone || !id) {
      return res.status(401).json({ message: "Please Fill All the Fields" });
    }

    const userUpdatedData = { username, email, phone, id };
    console.log("userUpdatedData", userUpdatedData);

    const newUpdatedData = await User.updateOne(
      { _id: id },
      { $set: userUpdatedData }
    );

    return res.status(200).json({ msg: newUpdatedData });
  } catch (error) {
    return res.status(401).json({ msg: error });
  }
};

//for contact
const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts) {
      return res.status(404).json({ message: "No Contact Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// for delete contact
const deleteContact =async (req , res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id : id});
    return res.status(200).json({ message: "Message Deleted SuccessFully" });
  } catch (error) {
    return res.status(400).json({error})
  }
}

module.exports = { getAllUser, getAllContact, deleteUser, updateUser, deleteContact };
