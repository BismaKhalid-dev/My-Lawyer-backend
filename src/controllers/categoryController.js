import Category from "../models/Category.js";

export async function getCategories(req, res) {
  const categories = await Category.find({ isActive: true }).sort({ label: 1 });
  res.json({ categories });
}

export async function getAllCategoriesAdmin(req, res) {
  const categories = await Category.find().sort({ label: 1 });
  res.json({ categories });
}

export async function createCategory(req, res) {
  try {
    const { label, iconKey } = req.body;
    const category = await Category.create({ label, iconKey });
    res.status(201).json({ category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category deleted" });
}
