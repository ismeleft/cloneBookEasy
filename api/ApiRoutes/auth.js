import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("這邊是 AuthApi End points 連接點");
});

export default router;
