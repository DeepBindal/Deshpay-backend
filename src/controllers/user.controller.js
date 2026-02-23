const User = require("../models/User");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

/**
 * GET /api/admin/users
 * List all users
 */
exports.getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.json(users);
});

/**
 * PATCH /api/admin/users/:id/toggle
 * Enable / Disable user
 */
exports.toggleUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // Prevent admin from disabling themselves
  if (String(user._id) === req.user.id) {
    throw new ApiError("You cannot disable your own account", 400);
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    id: user._id,
    isActive: user.isActive,
  });
});
