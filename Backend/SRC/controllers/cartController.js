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

exports.delete = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const itemId = req.params.itemId;
  const result = await cartService.deleteCart(userId, itemId);
  res.status(200).json({ success: true, ...result });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const itemId = req.params.itemId;
  const { quantity } = req.body;
  const result = await cartService.patchService(userId, itemId, quantity);
  res.status(200).json({ success: true, ...result });
});

exports.entireDelete = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const result = await cartService.entireDelete(userId);
  res.status(200).json({ success: true, ...result });
});
