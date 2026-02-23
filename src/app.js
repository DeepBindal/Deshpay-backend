require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/providers", require("./routes/providers.routes"));
app.use("/api/banners", require("./routes/banners.routes"));
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/admin/banners", require("./routes/admin.banners.routes"));
app.use("/api/admin/transactions", require("./routes/admin.transactions.routes"));
app.use("/api/admin/providers", require("./routes/admin.providers.routes"));
app.use("/api/admin", require("./routes/admin.users.routes"));
app.use("/api/transactions", require("./routes/transactions.routes"));
app.use("/api/system", require("./routes/system.transactions.routes"));

app.use(require("./middleware/errorHandler"));

module.exports = app;
