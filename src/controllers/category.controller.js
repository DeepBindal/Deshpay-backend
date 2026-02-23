const Category = require("../models/Category");
const asyncWrapper = require("../utils/asyncWrapper");

exports.getCategories = asyncWrapper(async (_, res) => {
  const categories = await Category.find({ isActive: true }).sort({ order: 1 });

  res.json(categories);
});
