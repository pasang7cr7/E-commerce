const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 100,
    },

    images: [{ url: String }],

    slug: {
      type: String,
      unique: true,
    },

    variant: [
      {
        sku: { type: String, required: true, unique: true },
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", product);
