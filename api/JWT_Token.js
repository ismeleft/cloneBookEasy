import jwt from "jsonwebtoken";
import { errorMessage } from "./errorMessage.js";

const JWT_Token = (req, res, next, callBackFunction) => {
  const token = req.cookies.JWT_token;
  if (!token) {
    return next(errorMessage(401, "請先登入"));
  }

  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) {
      return next(errorMessage(403, "TOKEN 無效，解 JWT 失敗"));
    }

    req.userData = payload; // 解碼後的 user 資訊
    callBackFunction();
  });
};

export const verifyUser = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    const apiUserId = req.params.id;
    if (req.userData.id === apiUserId || req.userData.isAdmin) {
      return next();
    }
    next(errorMessage(403, "無權限：只能修改自己的帳戶，或需要管理員權限"));
  });
};

export const verifyAdmin = (req, res, next) => {
  JWT_Token(req, res, next, () => {
    if (req.userData.isAdmin) {
      return next();
    }
    next(errorMessage(403, "無權限：僅限管理員操作"));
  });
};
