const router = require("express").Router();
const ctrl = require("../controllers/banner.controller");

router.get("/", ctrl.getBanners);

module.exports = router;
