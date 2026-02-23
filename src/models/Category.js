const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // electricity, mobile-prepaid
    },
    label: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["bill", "topup"],
      required: true,
    },
    icon: String,
    hint: String,
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", CategorySchema);
