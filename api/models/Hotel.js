import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String, // 住宿名稱
    required: true,
  },
  type: {
    type: String, // 住宿型態，飯店、公寓、民宿等
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
  },
  photos: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  rooms: {
    type: [String],
    // 應該是要 required:true
    // 等 room 確認創建好記得更新
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  popularHotel: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Hotel", HotelSchema);
