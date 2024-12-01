import express from "express";
import { register, login } from "../RoutesController/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("這邊是 AuthApi End points 連接點");
});

router.post("/register", register);

router.post("/login", login);

export default router;
