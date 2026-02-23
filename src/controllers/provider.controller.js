const Provider = require("../models/Provider");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");
const { logoByDomain, logoByName } = require("../utils/logo");

/**
 * PUBLIC: Get providers by category
 * GET /api/providers?category=electricity
 */
exports.getProviders = asyncWrapper(async (req, res) => {
  const { category } = req.query;
  if (!category) {
    throw new ApiError("Category is required", 400);
  }

  const providers = await Provider.find({
    category,
    isActive: true,
  }).sort({ region: 1, name: 1 });

  const enriched = providers.map((p) => {
    const logoUrl = p.domain ? logoByDomain(p.domain) : logoByName(p.name);
    return {
      ...p.toObject(),
      logoUrl,
    };
  });

  res.json(enriched);
});

exports.getAdminProviders = asyncWrapper(async (req, res) => {
  const providers = await Provider.find({
    isActive: true,
  }).sort({ region: 1, name: 1 });

  const enriched = providers.map((p) => {
    const logoUrl = p.domain ? logoByDomain(p.domain) : logoByName(p.name);

    return {
      ...p.toObject(),
      logoUrl,
    };
  });

  res.json(enriched);
});

/**
 * ADMIN: Create provider
 * POST /api/admin/providers
 */
exports.createProvider = asyncWrapper(async (req, res) => {
  const { name, category, region, tags, domain } = req.body;

  if (!name || !category) {
    throw new ApiError("Name and category are required", 400);
  }
  const logoUrl = domain ? logoByDomain(domain) : logoByName(name);
  const provider = await Provider.create({
    name,
    category,
    region,
    tags,
    logoUrl,
    domain,
  });

  res.json(provider);
});

/**
 * ADMIN: Update provider
 * PATCH /api/admin/providers/:id
 */
exports.updateProvider = asyncWrapper(async (req, res) => {
  const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!provider) {
    throw new ApiError("Provider not found", 404);
  }

  res.json(provider);
});

/**
 * ADMIN: Toggle provider
 * PATCH /api/admin/providers/:id/toggle
 */
exports.toggleProvider = asyncWrapper(async (req, res) => {
  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    throw new ApiError("Provider not found", 404);
  }

  provider.isActive = !provider.isActive;
  await provider.save();

  res.json({
    id: provider._id,
    isActive: provider.isActive,
  });
});
