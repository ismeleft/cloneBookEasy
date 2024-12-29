import express from "express";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../RoutesController/user.js";
import { verifyUser, verifyAdmin } from "../JWT_Token.js";

const router = express.Router();

// 更新使用者 (需驗證為本人 或 管理員)
router.put("/:id", verifyUser, updateUser);

// 刪除使用者 (需驗證為本人 或 管理員)
router.delete("/:id", verifyUser, deleteUser);

// 讀取單一使用者資料 (需驗證為本人 或 管理員)
router.get("/:id", verifyUser, getUser);

// 讀取所有使用者資料 (僅限管理員)
router.get("/", verifyAdmin, getAllUsers);

export default router;
