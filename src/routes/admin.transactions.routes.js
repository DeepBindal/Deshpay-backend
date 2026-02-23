const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/transaction.controller");

router.get("/", auth, admin, ctrl.getAllTransactions);

module.exports = router;
