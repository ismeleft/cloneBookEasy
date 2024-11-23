import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { errorMessage } from "../errorMessage.js";

/**
 * 更新 Hotel 的房間列表
 * @param {String} hotelId
 * @param {String} roomId
 * @param {String} operation - 操作類型，"add" 或 "remove"
 */
const updateHotelRooms = async (hotelId, roomId, operation) => {
  const update =
    operation === "add"
      ? { $push: { rooms: roomId } }
      : { $pull: { rooms: roomId } };
  const hotel = await Hotel.findByIdAndUpdate(hotelId, update);

  if (!hotel) {
    throw errorMessage(404, "找不到指定的 hotel ID，無法更新房間資訊");
  }

  return hotel;
};

/**
 * 新增房間
 */
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    await updateHotelRooms(hotelId, savedRoom._id, "add");
    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新房間資訊
 */
export const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRoom) {
      return next(errorMessage(404, "找不到指定的房間 ID"));
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    next(errorMessage(400, "房間更新失敗，可能為資料格式錯誤", error));
  }
};

/**
 * 刪除房間
 */
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomId = req.params.id;

  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return next(errorMessage(404, "找不到指定的房間 ID"));
    }

    try {
      await updateHotelRooms(hotelId, roomId, "remove");
    } catch (updateError) {
      return next(
        errorMessage(
          500,
          "房間刪除成功，但更新 Hotel 資料時發生錯誤",
          updateError
        )
      );
    }

    res.status(200).json({ message: "房間刪除成功" });
  } catch (error) {
    next(error);
  }
};

/**
 * 取得單一房間資訊
 */
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(errorMessage(404, "找不到指定的房間 ID"));
    }

    res.status(200).json(room);
  } catch (error) {
    next(errorMessage(500, "取得房間資訊時發生伺服器錯誤", error));
  }
};

/**
 * 取得所有房間資訊
 */
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(errorMessage(500, "取得所有房間資訊時發生伺服器錯誤", error));
  }
};

/**
 * 取得指定 hotel 的所有房間
 */
export const getHotelRooms = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    const hotelData = await Hotel.findById(hotelId);

    if (!hotelData) {
      return next(errorMessage(404, "找不到指定的 hotel ID"));
    }

    const roomList = await Promise.all(
      hotelData.rooms.map((roomId) => Room.findById(roomId))
    );

    res.status(200).json(roomList);
  } catch (error) {
    next(errorMessage(500, "取得房間清單時發生伺服器錯誤", error));
  }
};
