const express = require("express");
const router = express.Router();

const {
    withdrawMoney
} = require("../controllers/withdrawalController");

router.post("/", withdrawMoney);

module.exports = router;
