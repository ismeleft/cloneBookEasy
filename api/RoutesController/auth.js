import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const register = async (req, res, next) => {
  const registerData = req.body;
  try {
    const registerWrong =
      (await User.findOne({
        username: registerData.username,
      })) || (await User.findOne({ email: registerData.email }));
    if (registerWrong)
      return next(errorMessage(400, "錯誤，此帳號或信箱已被註冊"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(registerData.password, salt);
    const newUser = new User({
      username: registerData.username,
      email: registerData.email,
      password: hash,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    next(errorMessage(400, "註冊失敗", error));
  }
};

const login = async (req, res, next) => {
  const loginData = req.body;
  try {
    const userData =
      (await User.findOne({ username: loginData.account })) ||
      (await User.findOne({ email: loginData.account }));
    if (!userData) return next(errorMessage(404, "沒有此使用者，請重新確認"));
    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      userData.password
    );
    if (!isPasswordCorrect) return next(errorMessage(404, "密碼輸入錯誤"));
    res.status(200).json(`${userData.username}登入成功`);
  } catch (error) {
    next(errorMessage(400, "登入失敗", error));
  }
};

export { register, login };
