const {
    initiateTransfer
} = require("../config/paystack");

/*
|--------------------------------------------------------------------------
| Withdraw Money
|--------------------------------------------------------------------------
*/

exports.withdrawMoney = async (req, res) => {

    try {

        const {

            amount,
            recipient_code,
            reason

        } = req.body;

        if (!amount) {

            return res.status(400).json({

                success: false,
                message: "Withdrawal amount is required."

            });

        }

        if (!recipient_code) {

            return res.status(400).json({

                success: false,
                message: "Recipient code is required."

            });

        }

        const transfer = await initiateTransfer(

            amount,
            recipient_code,
            reason || "Wallet Withdrawal"

        );

        return res.json({

            success: true,
            message: "Transfer initiated successfully.",
            data: transfer.data

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
