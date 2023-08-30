const express = require("express");
const { uploadImages } = require("./middleware");
const { getResult } = require("./controller");

const router = express.Router();


router.get("/", (req, res) => {
  return res.json({ message: "Hello world 🔥🇵🇹" });
 });
 
 router.post(
   "/multiple-upload",
   uploadImages,
   getResult
 );

module.exports = router;

