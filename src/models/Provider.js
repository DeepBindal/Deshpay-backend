const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    region: { type: String },
    tags: [String],
    domain: String,
    logoUrl: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Provider", ProviderSchema);
