import User from "../models/User.js";
import { errorMessage } from "../errorMessage.js";

// 查找特定會員資料
const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorMessage(404, "找不到指定會員的資料", null));
    }
    res.status(200).json(user);
  } catch (error) {
    next(errorMessage(400, "無效的會員ID格式", error));
  }
};

// 取得所有會員資料
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(errorMessage(400, "取得會員資料失敗", error));
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updateUser) {
      return next(errorMessage(404, "找不到要更新的會員資料", null));
    }
    res.status(200).json(updateUser);
  } catch (error) {
    next(
      errorMessage(
        400,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return next(errorMessage(404, "找不到要刪除的會員資料", null));
    }
    res.status(200).json("用戶刪除成功");
  } catch (error) {
    next(errorMessage(400, "刪除失敗，請確認是否有其id", error));
  }
};

export { getUser, getAllUsers, updateUser, deleteUser };
