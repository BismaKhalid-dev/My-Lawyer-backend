// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import lawyerRoutes from "./routes/lawyerRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN, "*"],
//   })
// );
// app.use(express.json());

// app.get("/", (req, res) => res.json({ message: "Mera Wakeel API is alive" }));

// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/lawyers", lawyerRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/users", userRoutes);

// // 404 handler
// app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Server error occurred" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server chal raha hai: http://localhost:${PORT}`));
// Sirf LOCAL development ke liye — Vercel par ye file use nahi hoti,
// wahan api/index.js entry point hai.

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chal raha hai: http://localhost:${PORT}`));