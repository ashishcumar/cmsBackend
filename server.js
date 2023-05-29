const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const router = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");
const filterRoutes = require("./routes/filterRoutes");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./dbConfig/mongoDbConnection");
connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api/blog", router);
app.use("/api/admin", adminRoutes);
app.use("/api/filter", filterRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on PORT=>", process.env.PORT);
});
