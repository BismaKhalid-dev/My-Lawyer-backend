import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    label: { type: String, required: true, unique: true, trim: true },
    iconKey: { type: String, default: "family" }, // generic key, e.g. "family", "criminal" — each frontend maps this to its own icon set
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
