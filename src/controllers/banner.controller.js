const Banner = require("../models/Banner");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

/**
 * PUBLIC: Get active banners
 * GET /api/banners
 */
exports.getBanners = asyncWrapper(async (_, res) => {
  const banners = await Banner.find({ isActive: true }).sort({
    order: 1,
    createdAt: -1,
  });

  res.json(banners);
});

/**
 * ADMIN: Create banner
 * POST /api/admin/banners
 */
exports.createBanner = asyncWrapper(async (req, res) => {
  const { title, subtitle, code, order } = req.body;

  if (!req.file) {
    throw new ApiError("Banner image is required", 400);
  }

  const imageUrl = `/uploads/banners/${req.file.filename}`;

  const banner = await Banner.create({
    title,
    subtitle,
    code,
    order,
    imageUrl,
  });

  res.json(banner);
});

/**
 * ADMIN: Toggle banner
 * PATCH /api/admin/banners/:id/toggle
 */
exports.toggleBanner = asyncWrapper(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    throw new ApiError("Banner not found", 404);
  }

  banner.isActive = !banner.isActive;
  await banner.save();

  res.json({
    id: banner._id,
    isActive: banner.isActive,
  });
});
