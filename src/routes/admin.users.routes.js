const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/user.controller");

router.get("/users", auth, admin, ctrl.getUsers);
router.patch("/users/:id/toggle", auth, admin, ctrl.toggleUser);

module.exports = router;
