const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email });
    if(userData.isAdmin){
        next();
    }else{
        return res.json({message : false})
    }
    
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
