import Lawyer from "../models/Lawyer.js";

export async function getLawyers(req, res) {
  const { category, mode } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (mode === "video") filter.supportsVideo = true;
  if (mode === "inperson") filter.supportsInPerson = true;

  const lawyers = await Lawyer.find(filter).populate("category", "label iconKey").sort({ rating: -1 });
  res.json({ lawyers });
}

export async function getAllLawyersAdmin(req, res) {
  const lawyers = await Lawyer.find().populate("category", "label").sort({ createdAt: -1 });
  res.json({ lawyers });
}

export async function createLawyer(req, res) {
  try {
    const lawyer = await Lawyer.create(req.body);
    res.status(201).json({ lawyer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateLawyer(req, res) {
  try {
    const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
    res.json({ lawyer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function addLawyerReview(req, res) {
  try {
    const { rating, comment, name } = req.body;
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const review = {
      name: name?.trim() || req.user?.name || "Anonymous",
      rating: Math.min(5, Math.max(0, Number(rating) || 0)),
      comment: (comment || "").trim(),
    };

    lawyer.reviews = lawyer.reviews ? [...lawyer.reviews, review] : [review];
    const totalRating = lawyer.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    lawyer.rating = lawyer.reviews.length
      ? parseFloat((totalRating / lawyer.reviews.length).toFixed(1))
      : lawyer.rating;
    await lawyer.save();

    res.status(201).json({ lawyer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteLawyer(req, res) {
  const lawyer = await Lawyer.findByIdAndDelete(req.params.id);
  if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });
  res.json({ message: "Lawyer deleted" });
}
