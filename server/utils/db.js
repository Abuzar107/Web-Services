const mongoose = require("mongoose");

const URL =
  "mongodb+srv://mern_admin:eVYjAGzE1FlDaxOM@cluster0.vhswvv5.mongodb.net/mern_admin?retryWrites=true&w=majority";

// const URL =
//   "mongodb+srv://abuzar:4N2O3XVTeA0XqtEr@cluster0.cqfytof.mongodb.net/?retryWrites=true&w=majority";

const DBconnect = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("DB connected successfully");
    });
  } catch (error) {
    console.log(error);
    // process.exit();
  }
};

module.exports = DBconnect;
