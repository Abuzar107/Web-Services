const express = require("express");
const DBconnect = require("./utils/db");
const app = express();
const authRouter = require("./router/auth-route");
const contactRouter = require("./router/contact-route");
const serviceRoute = require("./router/service-router");
const adminRouter = require("./router/admin-router");
const errorMiddleWare = require("./middleware/error-middle-ware");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/form", contactRouter);
app.use("/api/data", serviceRoute);
app.use("/admin", adminRouter);

app.use(errorMiddleWare);

DBconnect().then(() => {
  app.listen(5000, () => {
    console.log("listing on port 5000");
  });
});
