const Product = require("../Models/products");
const AppError = require("../utils/AppError");

const slugify = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Fixed: Removed extra parentheses
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-"); // Fixed: Removed the accidental space
};

exports.createProduct = async ({
  name,
  description,
  images,
  variant,
  category,
}) => {
  let slug = slugify(name);
  let counter = 1;
  const existing = await Product.findOne({ slug });
  while (existing) {
    slug = `${slugify(name)}-${counter}`;
    existing = await Product.findOne({ slug });
    counter++;
  }

  if (!variant || variant.length === 0) {
    throw new AppError("At least one variant is required", 400);
  }

  const product = await Product.create({
    name,
    description,
    images,
    slug,
    variant,
    category,
    status: "draft",
  });
  return product;
};

exports.getPublishedProducts = async ({
  page = 1,
  limit = 10,
  search,
  category,
  minPrice,
  maxPrice,
}) => {
  const skip = (page - 1) * limit;

  const filter = { status: "published" };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (category) {
    if (Array.isArray(category)) {
      filter.category = { $in: category };
    }
  }

  if (maxPrice || minPrice) {
    const priceFilter = {};
    if (minPrice) {
      priceFilter.price = { $gte: minPrice };
    }
    if (maxPrice) {
      priceFilter.price = { ...priceFilter.price, $lte: maxPrice };
    }
    filter.variants = { $elemMatch: priceFilter };
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments(filter);

  return { products, page, limit, total, totalPages: Math.ceil(total / limit) };
};
