import Hotel from "../models/Hotel.js";
import { errorMessage } from "../errorMessage.js";

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(errorMessage(500, "資料上傳錯誤請確認格式", error));
  }
};
const getHotel = async (req, res, next) => {
  const id = req.params.id;
  next();
  try {
    const getHotel = await Hotel.findById(id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(errorMessage(500, "找不到資料，請檢查使否有此id", error));
  }
};
const updatedHotel = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(
      errorMessage(
        500,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};
const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("刪除資料成功");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，請確認是否有其id", error));
  }
};

export { createHotel, getHotel, updatedHotel, deleteHotel };
