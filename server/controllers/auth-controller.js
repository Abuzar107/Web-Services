const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.send("All Good");
  } catch (error) {
    res.send(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const isEmailPresent = await User.findOne({ email });

    if (isEmailPresent) {
      return res.status(400).json({message : "User is Already Registred"});
    }

    const userCreated = await User.create({ username, email, phone, password });

    return res.status(201).json({
      message: "userCreated successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // console.error(error);
    // res.status(400).send(error);
    next(error);
  }
};

//for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await User.findOne({ email });

    if (!isUserPresent) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (isPasswordCorrect) {
      res.status(200).json({
        message: "Login successfully",
        token: await isUserPresent.generateToken(),
        userId: isUserPresent._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid User and Password" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  home,
  register,
  login,
  user,
};
