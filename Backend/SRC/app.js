const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Local modules
const authRouter = require("./Routes/authRoute");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

//1.Security

app.use(helmet());
// 2. CORS
app.use(cors());
// 3. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 4. Logger
app.use(morgan("dev"));
// 5. Routes (placeholder for now)
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth/", authRouter);

app.use(errorHandler);

module.exports = app;
