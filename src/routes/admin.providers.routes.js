const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/provider.controller");

router.post("/", auth, admin, ctrl.createProvider);
router.get("/", auth, admin, ctrl.getAdminProviders);
router.patch("/:id", auth, admin, ctrl.updateProvider);
router.patch("/:id/toggle", auth, admin, ctrl.toggleProvider);

module.exports = router;
