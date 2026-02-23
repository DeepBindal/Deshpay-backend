const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

exports.signup = asyncWrapper(async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    throw new ApiError("Missing required fields", 400);
  }

  const exists = await User.findOne({ phone });
  if (exists) {
    throw new ApiError("User already exists", 400);
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hash,
  });

  res.json({
    token: signToken(user),
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
    },
  });
});

exports.login = asyncWrapper(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new ApiError("Phone and password are required", 400);
  }

  const user = await User.findOne({ phone });
  if (!user) {
    throw new ApiError("Invalid credentials", 400);
  }

  if (!user.isActive) {
    throw new ApiError("Account disabled", 403);
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new ApiError("Invalid credentials", 400);
  }

  res.json({
    token: signToken(user),
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
    },
  });
});

exports.me = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  res.json(user);
});
