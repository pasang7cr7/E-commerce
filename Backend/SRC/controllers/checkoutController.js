const checkoutService = require("../Services/checkoutService");
const catchAsync = require("../utils/catchAsync");

exports.checkout = catchAsync(async (req, res, next) => {
  const { currency } = req.body;
  const result = await checkoutService.createCheckoutSession(
    req.user._id,
    currency,
  );
  res.status(201).json({ success: true, ...result });
});
