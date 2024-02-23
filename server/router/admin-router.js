const {
  getAllUser,
  getAllContact,
  deleteUser,
  updateUser,
  deleteContact,
} = require("../controllers/admin-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUser);
router.delete("/users/delete/:id", authMiddleware, adminMiddleware, deleteUser);
router.post("/users/update/:id", updateUser);

router.get("/contacts", authMiddleware, adminMiddleware, getAllContact);
router.delete("/contacts/delete/:id", deleteContact);

module.exports = router;
