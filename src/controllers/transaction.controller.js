const Transaction = require("../models/Transaction");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

/**
 * USER: Get own transactions
 * GET /api/transactions
 */
exports.getMyTransactions = asyncWrapper(async (req, res) => {
  const txns = await Transaction.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(txns);
});

/**
 * ADMIN: Get all transactions (filters)
 * GET /api/admin/transactions
 */
exports.getAllTransactions = asyncWrapper(async (req, res) => {
  const { status, userId, from, to } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (userId) filter.userId = userId;

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const txns = await Transaction.find(filter)
    .populate("userId", "name phone")
    .sort({ createdAt: -1 });

  res.json(txns);
});

/**
 * SYSTEM: Create transaction
 * Used by payment return / webhook
 */
exports.createTransaction = asyncWrapper(async (req, res) => {
  const {
    userId,
    providerId,
    category,
    providerName,
    amount,
    status,
    method,
    reference,
    externalTxnId,
    meta,
  } = req.body;

  if (!userId || !amount) {
    throw new ApiError("Missing required fields", 400);
  }

  const txn = await Transaction.create({
    userId,
    providerId,
    category,
    providerName,
    amount,
    status,
    method,
    reference,
    externalTxnId,
    meta,
  });

  res.json(txn);
});
