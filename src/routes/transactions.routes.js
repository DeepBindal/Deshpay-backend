const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/transaction.controller");

router.get("/", auth, ctrl.getMyTransactions);

module.exports = router;
