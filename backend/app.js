const cors = require("cors");
const express = require("express");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// import routes
const dataRouter = require("./routes/dataRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

// Auth routes
app.use("/api/v1/auth", authRouter);

// Seed routes
const seedData = require("./routes/seedDataRoutes");
app.use("/api/v1/data/seed", seedData);

// app routes
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/user", userRouter);

exports.app = app;
