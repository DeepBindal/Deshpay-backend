const router = require("express").Router();
const ctrl = require("../controllers/transaction.controller");

// protected later via secret / webhook signature
router.post("/transactions", ctrl.createTransaction);

module.exports = router;
