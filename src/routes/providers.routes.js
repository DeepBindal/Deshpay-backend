const router = require("express").Router();
const ctrl = require("../controllers/provider.controller");

router.get("/", ctrl.getProviders);

module.exports = router;
