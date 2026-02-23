const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    code: String,
    imageUrl: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Banner", BannerSchema);
