import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// 創建第一筆資料
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 取得所有資料
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 根據 id 取得特定資料
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
