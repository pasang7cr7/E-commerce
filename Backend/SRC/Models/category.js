const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);
