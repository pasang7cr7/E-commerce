const productService = require("../Services/productService");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, category, description, variant, images } = req.body;
  const result = await productService.createProduct({
    name,
    description,
    images,
    variant,
    category,
  });

  res.status(201).json({ success: true, ...result });
});

exports.getPublishedProducts = catchAsync(async (req, res, next) => {
  const result = await productService.getPublishedProducts(req.query);
  res.json({ success: true, ...result });
});
