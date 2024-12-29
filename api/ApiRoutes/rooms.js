import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getHotelRooms,
  getRoom,
  updateRoom,
} from "../RoutesController/rooms.js";
import { verifyAdmin } from "../JWT_Token.js";

const router = express.Router();

// 創建房間 (需管理員權限)
router.post("/:hotelid", verifyAdmin, createRoom);

// 更新房間資訊 (需管理員權限)
router.put("/:id", verifyAdmin, updateRoom);

// 刪除房間 (需管理員權限)
router.delete("/:hotelid/:id", verifyAdmin, deleteRoom);

// 取得單一房間資訊 (公開)
router.get("/:id", getRoom);

// 取得所有房間資訊 (公開)
router.get("/", getAllRooms);

// 取得指定 hotel 的所有房間 (公開)
router.get("/findHotel/:hotelid", getHotelRooms);

export default router;
