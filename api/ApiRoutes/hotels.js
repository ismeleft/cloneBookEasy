import express from "express";
import Hotel from "../models/Hotel.js";
import {
  createHotel,
  getHotel,
  updatedHotel,
  deleteHotel,
} from "../RoutesController/hotels.js";

const router = express.Router();

// 創建第一筆資料
router.post("/", createHotel);

// 取得所有資料
router.get("/", getHotel);

// 根據 id 取得特定資料
router.get("/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error) {
    next(error);
  }
});

// 找尋第一筆資料
router.get("/find/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const getHotel = await Hotel.findById(id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
});

// 修改第一筆資料
router.put("/:id", updatedHotel);

// 刪除資料
router.delete("/:id", deleteHotel);

export default router;
