const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },

    category: String,
    providerName: String,

    amount: Number,

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },

    method: String,

    reference: String,
    externalTxnId: String,

    meta: Object,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", TransactionSchema);
