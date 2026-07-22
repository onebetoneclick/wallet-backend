const {
    resolveAccount,
    createRecipient
} = require("../config/paystack");

/*
|--------------------------------------------------------------------------
| Verify Bank Account
|--------------------------------------------------------------------------
*/

exports.verifyBankAccount = async (req, res) => {

    try {

        const {
            account_number,
            bank_code
        } = req.body;

        if (!account_number || !bank_code) {

            return res.status(400).json({
                success: false,
                message: "Account number and bank code are required."
            });

        }

        const response = await resolveAccount(
            account_number,
            bank_code
        );

        return res.json({
            success: true,
            message: "Account verified successfully.",
            data: response.data
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message:
                error.response?.data?.message ||
                error.message
        });

    }

};

/*
|--------------------------------------------------------------------------
| Create Transfer Recipient
|--------------------------------------------------------------------------
*/

exports.createTransferRecipient = async (req, res) => {

    try {

        const {

            account_name,
            account_number,
            bank_code

        } = req.body;

        if (
            !account_name ||
            !account_number ||
            !bank_code
        ) {

            return res.status(400).json({

                success: false,
                message: "All fields are required."

            });

        }

        const response = await createRecipient(

            account_name,
            account_number,
            bank_code

        );

        return res.json({

            success: true,
            message: "Recipient created successfully.",
            data: response.data

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,
            message:
                error.response?.data?.message ||
                error.message

        });

    }

};
