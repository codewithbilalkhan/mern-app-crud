const express = require("express");
const  { handleBookStoreController, handlebooklistController, handlebookdeleteController } = require("../controller/book.controller");


const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handlebooklistController);
router.delete("/deletebook", handlebookdeleteController)
module.exports = router;