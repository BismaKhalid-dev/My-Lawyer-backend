import express from "express";
import {
  getLawyers,
  getAllLawyersAdmin,
  createLawyer,
  updateLawyer,
  addLawyerReview,
  deleteLawyer,
} from "../controllers/lawyerController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getLawyers);
router.get("/admin/all", protect, adminOnly, getAllLawyersAdmin);
router.post("/", protect, adminOnly, createLawyer);
router.post("/:id/reviews", protect, addLawyerReview);
router.put("/:id", protect, adminOnly, updateLawyer);
router.delete("/:id", protect, adminOnly, deleteLawyer);

export default router;
