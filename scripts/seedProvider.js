require("dotenv").config();
const mongoose = require("mongoose");
const Provider = require("../src/models/Provider");
const { logoByDomain, logoByName } = require("../src/utils/logo");

const mk = (id, name, region, tags, domain) => ({
  name,
  region,
  tags,
  domain,
});

const PROVIDERS = {
  electricity: [
    mk(
      "tata-power-ddl",
      "Tata Power-DDL",
      "Delhi",
      ["Fast Bill Fetch"],
      "tatapower.com",
    ),
    mk(
      "bses-rajdhani",
      "BSES Rajdhani",
      "Delhi",
      ["Autopay Eligible"],
      "bsesdelhi.com",
    ),
    mk("bses-yamuna", "BSES Yamuna", "Delhi", ["Popular"], "bsesdelhi.com"),
    mk(
      "msedcl",
      "MSEDCL (Mahavitaran)",
      "Maharashtra",
      ["High Volume"],
      "mahadiscom.in",
    ),
    mk(
      "torrent-power",
      "Torrent Power",
      "Gujarat",
      ["Instant"],
      "torrentpower.com",
    ),
    mk(
      "bescom",
      "BESCOM",
      "Karnataka",
      ["Quick Pay"],
      "bescom.karnataka.gov.in",
    ),
    mk("hescom", "HESCOM", "Karnataka", ["Bill Fetch"], "hescom.co.in"),
    mk("tneb", "TANGEDCO", "Tamil Nadu", ["State Utility"], "tangedco.gov.in"),
    mk("wbsetcl", "WBSEDCL", "West Bengal", ["High Volume"], "wbsedcl.in"),
  ],
  "mobile-prepaid": [
    mk("airtel", "Airtel", "India", ["5G Packs"], "airtel.in"),
    mk("jio", "Jio", "India", ["Popular"], "jio.com"),
    mk("vi", "Vi", "India", ["Weekend Data"], "myvi.in"),
    mk("bsnl", "BSNL", "India", ["Budget"], "bsnl.co.in"),
    mk("mtnl", "MTNL", "Delhi/Mumbai", ["Legacy"], "mtnl.in"),
  ],
  "mobile-postpaid": [
    mk("airtel-post", "Airtel Postpaid", "India", ["Bill Fetch"], "airtel.in"),
    mk("jio-post", "Jio Postpaid", "India", ["Bill PDF"], "jio.com"),
    mk("vi-post", "Vi Postpaid", "India", ["Due Reminders"], "myvi.in"),
    mk("bsnl-post", "BSNL Postpaid", "India", ["Government"], "bsnl.co.in"),
  ],
  water: [
    mk(
      "djb",
      "Delhi Jal Board",
      "Delhi",
      ["Bill Fetch"],
      "delhijalboard.nic.in",
    ),
    mk("bwssb", "BWSSB", "Bengaluru", ["Instant"], "bwssb.gov.in"),
    mk("mcgm", "BMC Water", "Mumbai", ["High Volume"], "mcgm.gov.in"),
    mk(
      "hyd-water",
      "HMWSSB",
      "Hyderabad",
      ["Popular"],
      "hyderabadwater.gov.in",
    ),
    mk(
      "chennai-water",
      "CMWSSB",
      "Chennai",
      ["Metro Utility"],
      "chennaimetrowater.tn.gov.in",
    ),
  ],
  dth: [
    mk("tata-play", "Tata Play", "India", ["Top Packs"], "tataplay.com"),
    mk("dish", "Dish TV", "India", ["Offers"], "dishtv.in"),
    mk("airtel-dth", "Airtel Digital TV", "India", ["Popular"], "airtel.in"),
    mk("sun-direct", "Sun Direct", "South India", ["Regional"], "sundirect.in"),
    mk(
      "dd-free-dish",
      "DD Free Dish",
      "India",
      ["FTA"],
      "prasarbharati.gov.in",
    ),
  ],
  gas: [
    mk("igl", "Indraprastha Gas", "Delhi-NCR", ["Bill Fetch"], "iglonline.net"),
    mk("mgl", "Mahanagar Gas", "Mumbai", ["Instant"], "mahanagargas.com"),
    mk("gail-gas", "GAIL Gas", "India", ["PNG/CNG"], "gailgas.com"),
    mk(
      "adani-gas",
      "Adani Total Gas",
      "India",
      ["Fast Expansion"],
      "adanigas.com",
    ),
  ],
  fastag: [
    mk(
      "paytm-fastag",
      "Paytm FASTag",
      "India",
      ["Instant Top-up"],
      "paytm.com",
    ),
    mk("icici-fastag", "ICICI FASTag", "India", ["Popular"], "icicidirect.com"),
    mk(
      "airtel-fastag",
      "Airtel FASTag",
      "India",
      ["Easy Recharge"],
      "airtel.in",
    ),
    mk("hdfc-fastag", "HDFC FASTag", "India", ["Bank Issued"], "hdfcbank.com"),
    mk("sbi-fastag", "SBI FASTag", "India", ["PSU Bank"], "sbi.co.in"),
  ],
  broadband: [
    mk("jiofiber", "JioFiber", "India", ["Bill Fetch"], "jio.com"),
    mk(
      "airtel-xstream",
      "Airtel Xstream Fiber",
      "India",
      ["Quick Pay"],
      "airtel.in",
    ),
    mk("act", "ACT Fibernet", "India", ["Fast"], "actcorp.in"),
    mk("bsnl-bb", "BSNL Broadband", "India", ["Government"], "bsnl.co.in"),
    mk(
      "you-broadband",
      "YOU Broadband",
      "Select Cities",
      ["Cable ISP"],
      "youbroadband.in",
    ),
  ],
  "credit-card": [
    mk("hdfc-cc", "HDFC Credit Card", "India", ["Bill Fetch"], "hdfcbank.com"),
    mk(
      "icici-cc",
      "ICICI Credit Card",
      "India",
      ["Rewards"],
      "icicidirect.com",
    ),
    mk("sbi-cc", "SBI Card", "India", ["Popular"], "sbicard.com"),
    mk(
      "axis-cc",
      "Axis Bank Credit Card",
      "India",
      ["Cashback"],
      "axisbankfoundation.org",
    ),
    mk(
      "amex-cc",
      "American Express",
      "India",
      ["Premium"],
      "americanexpress.com",
    ),
  ],
  ott: [
    mk("netflix", "Netflix", "India", ["Subscription"], "netflix.com"),
    mk("hotstar", "Disney+ Hotstar", "India", ["Popular"], "hotstar.com"),
    mk("prime", "Amazon Prime", "India", ["Bundle"], "amazon.in"),
    mk("sony-liv", "Sony LIV", "India", ["Sports"], "sonyliv.com"),
    mk("zee5", "ZEE5", "India", ["Regional"], "zee5.com"),
  ],
  "loan-emi": [
    mk("hdfc-loan", "HDFC Loans", "India", ["EMI Pay"], "hdfcbank.com"),
    mk("bajaj-fin", "Bajaj Finance", "India", ["Quick Pay"], "bajajfinserv.in"),
    mk("sbi-loan", "SBI Loans", "India", ["Due Alerts"], "sbi.co.in"),
    mk(
      "icici-loan",
      "ICICI Loans",
      "India",
      ["Personal/Home"],
      "icicidirect.com",
    ),
    mk(
      "axis-loan",
      "Axis Bank Loans",
      "India",
      ["Retail"],
      "axisbankfoundation.org",
    ),
  ],
  education: [
    mk("school-pay", "School Fees", "India", ["Fee Receipt"], "cbse.gov.in"),
    mk("college-pay", "College Fees", "India", ["Instant"], "ugc.ac.in"),
    mk("coaching-pay", "Coaching Institutes", "India", ["Monthly Fees"], null),
    mk("exam-pay", "Exam Fees", "India", ["Applications"], "nta.ac.in"),
  ],
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB...");

    const flattenedProviders = Object.entries(PROVIDERS).flatMap(
      ([category, list]) =>
        list.map((p) => ({
          ...p,
          category,
        })),
    );

    const seedPromises = flattenedProviders.map(async (providerData) => {
      const logoUrl = providerData.domain
        ? logoByDomain(providerData.domain)
        : logoByName(providerData.name);

      return Provider.create({
        ...providerData,
        logoUrl: logoUrl || "https://example.com/default-logo.png", // Fallback
      });
    });

    await Promise.all(seedPromises);

    console.log(
      `✅ Successfully seeded ${flattenedProviders.length} providers`,
    );
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
})();
