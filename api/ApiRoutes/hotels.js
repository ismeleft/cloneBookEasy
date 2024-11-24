import express from "express";
import {
  createHotel,
  getHotel,
  updatedHotel,
  deleteHotel,
  getAllHotels,
} from "../RoutesController/hotels.js";

const router = express.Router();

// 創建第一筆資料
router.post("/", createHotel);

// 找尋特定飯店資料
router.get("/find/:id", getHotel);

// 取得所有飯店資料
router.get("/", getAllHotels);

// 修改第一筆資料
router.put("/:id", updatedHotel);

// 刪除資料
router.delete("/:id", deleteHotel);

export default router;
