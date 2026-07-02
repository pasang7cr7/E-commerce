const router = require("express").Router();
const protect = require("../middleware/auth");
const checkoutController = require("../controllers/checkoutController");

router.post("/", protect, checkoutController.checkout);

module.exports = router;
