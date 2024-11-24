import { ObjectId } from "mongodb";
import { errorMessage } from "../errorMessage.js";

export const validateObjectId = (params) => (req, res, next) => {
  for (const param of params) {
    const id = req.params[param];
    if (
      id &&
      (!ObjectId.isValid(id) || String(ObjectId.createFromHexString(id)) !== id)
    ) {
      return next(errorMessage(400, `無效的 ${param} 格式`));
    }
  }
  next();
};
