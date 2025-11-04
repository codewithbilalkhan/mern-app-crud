const express = require("express");
const  { handleBookStoreController, handlebooklistController, handlebookdeleteController, handlebookupdateController } = require("../controller/book.controller");


const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handlebooklistController);
router.delete("/deletebook", handlebookdeleteController)
router.put("/updatebook", handlebookupdateController)
module.exports = router;