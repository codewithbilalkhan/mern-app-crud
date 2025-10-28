const express = require("express");
const  { handleBookStoreController } = require("../controller/book.controller");


const router = express.Router();

router.post("/addbook", handleBookStoreController);

module.exports = router;