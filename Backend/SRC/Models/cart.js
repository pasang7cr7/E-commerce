const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
    unique: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: products,
      },
      variantSku: {
        type: String,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cart);
