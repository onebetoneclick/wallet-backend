const express = require("express");
const router = express.Router();

const {
    verifyBankAccount,
    createTransferRecipient
} = require("../controllers/bankController");

router.post("/verify", verifyBankAccount);

router.post("/recipient", createTransferRecipient);

router.get("/list", getBanks);

module.exports = router;
