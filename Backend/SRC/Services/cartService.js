const AppError = require("../utils/AppError");
const Cart = require("../Models/cart");
const Product = require("../Models/products");

exports.addToCart = async (userId, productId, variantSku, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const variantExist = product.variant.find((v) => v.sku === variantSku);
  if (!variantExist) throw new AppError("Invalid Variant SKU", 400);

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  const existProduct = cart.items.find(
    (i) => i.product.toString() === productId && i.variantSku === variantSku,
  );

  if (existProduct) {
    existProduct.quantity += quantity;
  } else {
    cart.items.push({ product: productId, variantSku, quantity });
  }

  await cart.save();
  return {
    cartId: cart._id,
    items: cart.items,
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

exports.getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  console.log(cart);
  if (!cart) {
    return {
      items: [],
      totalItems: 0,
    };
  }
  return {
    items: cart.items,
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
