const router = require("express").Router();
const protect = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.post("/addToCart", protect, cartController.addToCart);

router.get("/", protect, cartController.getcart);

module.exports = router;
