const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
const port = 4000 || process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running", port);
  });
});
