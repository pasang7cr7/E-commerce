const router = require("express").Router();
const protect = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.post("/addToCart", protect, cartController.addToCart);

router.get("/", protect, cartController.getcart);

router.delete("/:itemId", protect, cartController.delete);

router.patch("/:itemId", protect, cartController.updateCartItem);
module.exports = router;

router.delete("/", protect, cartController.entireDelete);
