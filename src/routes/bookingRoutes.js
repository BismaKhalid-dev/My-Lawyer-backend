import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookingsAdmin,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/admin/all", protect, adminOnly, getAllBookingsAdmin);
router.put("/admin/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
