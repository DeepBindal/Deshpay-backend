require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../src/models/Category");

mongoose.connect(process.env.MONGO_URI);

const categories = [
  {
    key: "electricity",
    order: 1,
    label: "Electricity",
    mode: "bill",
    icon: "⚡",
    hint: "BSES, Tata Power, MSEDCL…",
  },
  {
    key: "mobile-prepaid",
    order: 2,
    label: "Mobile Recharge",
    mode: "topup",
    icon: "📱",
    hint: "Airtel, Jio, Vi, BSNL",
  },
  {
    key: "mobile-postpaid",
    order: 3,
    label: "Mobile Postpaid",
    mode: "bill",
    icon: "📄",
    hint: "Fetch & pay dues",
  },
  {
    key: "water",
    order: 4,
    label: "Water",
    mode: "bill",
    icon: "🚰",
    hint: "DJB, BWSSB…",
  },
  {
    key: "dth",
    order: 5,
    label: "DTH / Cable",
    mode: "topup",
    icon: "📺",
    hint: "Tata Play, Dish…",
  },
  {
    key: "gas",
    label: "Gas",
    mode: "bill",
    icon: "🔥",
    hint: "IGL, MGL…",
    order: 6,
  },

  // more categories
  {
    key: "fastag",
    order: 7,
    label: "FASTag",
    mode: "topup",
    icon: "🚗",
    hint: "ICICI, Paytm, Airtel…",
  },
  {
    key: "broadband",
    order: 8,
    label: "Broadband",
    mode: "bill",
    icon: "📶",
    hint: "JioFiber, Airtel…",
  },
  {
    key: "credit-card",
    order: 9,
    label: "Credit Card",
    mode: "bill",
    icon: "💳",
    hint: "HDFC, ICICI, SBI…",
  },
  {
    key: "ott",
    order: 10,
    label: "OTT",
    mode: "topup",
    icon: "🎬",
    hint: "Netflix, Hotstar…",
  },
  {
    key: "loan-emi",
    order: 11,
    label: "Loan EMI",
    mode: "bill",
    icon: "🏦",
    hint: "Pay EMIs quickly",
  },
  {
    key: "education",
    order: 12,
    label: "Education Fees",
    mode: "bill",
    icon: "🎓",
    hint: "Schools & colleges",
  },
];

(async () => {
  await Category.insertMany(categories);
  console.log("✅ Categories seeded");
  process.exit();
})();
