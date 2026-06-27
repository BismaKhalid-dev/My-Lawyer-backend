import Booking from "../models/Booking.js";
import Lawyer from "../models/Lawyer.js";

export async function createBooking(req, res) {
  try {
    const { lawyerId, mode, date, time } = req.body;
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const booking = await Booking.create({
      user: req.user._id,
      lawyer: lawyer._id,
      mode,
      date,
      time,
      fee: lawyer.fee,
      status: "confirmed",
    });

    const populated = await booking.populate([
      { path: "lawyer", populate: { path: "category", select: "label" } },
    ]);

    res.status(201).json({ booking: populated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getMyBookings(req, res) {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({ path: "lawyer", populate: { path: "category", select: "label" } })
    .sort({ createdAt: -1 });
  res.json({ bookings });
}

export async function getAllBookingsAdmin(req, res) {
  const bookings = await Booking.find()
    .populate("user", "name email phone")
    .populate({ path: "lawyer", populate: { path: "category", select: "label" } })
    .sort({ createdAt: -1 });
  res.json({ bookings });
}

export async function updateBookingStatus(req, res) {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ booking });
}
