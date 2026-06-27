import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    mode: { type: String, enum: ["inperson", "video"], required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    fee: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
