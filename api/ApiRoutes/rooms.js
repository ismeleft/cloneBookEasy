import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getHotelRooms,
  getRoom,
  updateRoom,
} from "../RoutesController/rooms.js";

const router = express.Router();

// 創建房間 (需指定 hotel ID)
router.post("/:hotelid", createRoom);

// 更新房間資訊
router.put("/:id", updateRoom);

// 刪除房間 (需指定 hotel ID 與 room ID)
router.delete("/:hotelid/:id", deleteRoom);

// 取得單一房間資訊
router.get("/:id", getRoom);

// 取得所有房間資訊
router.get("/", getAllRooms);

// 取得指定 hotel 的所有房間
router.get("/findHotel/:hotelid", getHotelRooms);

export default router;
