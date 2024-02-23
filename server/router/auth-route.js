const {
  home,
  register,
  login,
  user,
} = require("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware");
const  {signupSchema, loginSchema}  = require("../validators/auth-validator");
// const  loginSchema  = require("../validators/auth-validator");
const authMiddleware = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/user", authMiddleware, user);

module.exports = router;
