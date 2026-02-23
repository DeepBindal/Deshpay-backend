const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");
const ctrl = require("../controllers/banner.controller");

router.post("/", auth, admin, upload.single("image"), ctrl.createBanner);
router.get("/", auth, admin, upload.single("image"), ctrl.getBanners);

router.patch("/:id/toggle", auth, admin, ctrl.toggleBanner);

module.exports = router;
