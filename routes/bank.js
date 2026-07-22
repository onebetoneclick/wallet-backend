const express = require("express");
const router = express.Router();

const {
    getBanks,
    verifyBankAccount,
    createTransferRecipient
} = require("../controllers/bankController");

router.get("/list", getBanks);

router.post("/verify", verifyBankAccount);

router.post("/recipient", createTransferRecipient);

module.exports = router;
