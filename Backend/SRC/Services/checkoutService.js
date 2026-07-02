const Checkout = require("../Models/checkoutSchema");
const AppError = require("../utils/AppError");
const Cart = require("../Models/cart");

exports.createCheckoutSession = async (userId, currency) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0)
    throw new AppError("Cart is empty", 400);

  const result = cart.items.map((item) => {
    const variant = item.product.variant.find((v) => v.sku === item.variantSku);
    if (!variant) throw new AppError("Variant not found", 400);
    return {
      product: item.product._id,
      variantSku: item.variantSku,
      name: item.product.name,
      variantLabel: `${variant.color}/ Size ${variant.size}`,
      price: variant.price,
      quantity: item.quantity,
    };
  });

  //subtotal
  const subtotal =
    Math.round(
      result.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100,
    ) / 100;

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  //create the checkout document
  const checkoutSession = await Checkout.create({
    user: userId,
    items: result,
    status: "pending",
    currency,
    subtotal,
    expiresAt,
  });
  await Cart.findOneAndDelete({ user: userId });
  return {
    sessionId: checkoutSession._id,
    items: checkoutSession.items,
    subtotal: checkoutSession.subtotal,
    currency: checkoutSession.currency,
    expiresAt: checkoutSession.expiresAt,
    status: checkoutSession.status,
  };
};
