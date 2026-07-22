const axios = require("axios");

const paystack = axios.create({
    baseURL: "https://api.paystack.co",
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
    },
    timeout: 30000
});

/**
 * Verify Bank Account
 */
const resolveAccount = async (accountNumber, bankCode) => {
    const response = await paystack.get("/bank/resolve", {
        params: {
            account_number: accountNumber,
            bank_code: bankCode
        }
    });

    return response.data;
};

/**
 * Create Transfer Recipient
 */
const createRecipient = async (
    name,
    accountNumber,
    bankCode
) => {

    const response = await paystack.post("/transferrecipient", {
        type: "nuban",
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN"
    });

    return response.data;
};

/**
 * Initiate Transfer
 */
const initiateTransfer = async (
    amount,
    recipient,
    reason = "Wallet Withdrawal"
) => {

    const response = await paystack.post("/transfer", {
        source: "balance",
        amount: amount * 100,
        recipient,
        reason
    });

    return response.data;
};

/**
 * List Nigerian Banks
 */
const getBanks = async () => {

    const response = await paystack.get("/bank", {
        params: {
            country: "nigeria"
        }
    });

    return response.data;
};

module.exports = {
    paystack,
    resolveAccount,
    createRecipient,
    initiateTransfer,
    getBanks
};
