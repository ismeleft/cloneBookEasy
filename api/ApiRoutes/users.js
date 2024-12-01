import express from "express";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../RoutesController/user.js";

const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.get("/", getAllUsers);

export default router;
