import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    yearsExperience: { type: Number, default: 5 },
    fee: { type: Number, required: true },
    supportsVideo: { type: Boolean, default: true },
    supportsInPerson: { type: Boolean, default: true },
    bio: { type: String, default: "" },
    specializations: [{ type: String }],
    services: [{ type: String }],
    education: { type: String, default: "LL.B, Advocate" },
    membership: { type: String, default: "Bar Council Member" },
    verified: [{ type: String }],
    experienceItems: [{ type: String }],
    reviews: [
      {
        name: { type: String, trim: true },
        rating: { type: Number, min: 0, max: 5 },
        comment: { type: String, trim: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lawyer", lawyerSchema);
