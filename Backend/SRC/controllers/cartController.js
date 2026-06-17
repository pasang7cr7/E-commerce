const cartService = require("../Services/cartService");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, variantSku, quantity } = req.body;
  const result = await cartService.addToCart(
    req.user._id,
    productId,
    variantSku,
    quantity,
  );
  res.status(201).json({ success: true, ...result });
});

exports.getcart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const result = await cartService.getCart(userId);
  res.status(200).json({ success: true, ...result });
});
