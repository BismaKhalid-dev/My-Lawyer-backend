import express from "express";
import { getAllUsersAdmin } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAllUsersAdmin);

export default router;
