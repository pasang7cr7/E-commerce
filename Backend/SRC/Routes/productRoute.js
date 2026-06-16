const router = require("express").Router();
const productController = require("../controllers/productController");
const adminOnly = require("../middleware/adminOnly");

const protect = require("../middleware/auth");

router.post("/create", protect, adminOnly, productController.createProduct);

router.get("/", productController.getPublishedProducts);

module.exports = router;
