import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import lawyerRoutes from "./routes/lawyerRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN, "*"],
  })
);
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connect nahi ho saka" });
  }
});

app.get("/", (req, res) => res.json({ message: "Mera Wakeel API zinda hai" }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => res.status(404).json({ message: "Route nahi mila" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server mein kuch ghalat ho gaya" });
});

export default app;