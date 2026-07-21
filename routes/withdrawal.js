const express = require("express");

const router = express.Router();

const paystack = require("../services/paystack");



router.post("/", async(req,res)=>{


try{


const {

amount,
account_number,
bank_code,
name

}=req.body;



// create transfer recipient

const recipient =
await paystack.post(
"/transferrecipient",
{

type:"nuban",

name:name,

account_number,

bank_code,

currency:"NGN"

}

);



const transfer =
await paystack.post(
"/transfer",
{


source:"balance",

amount: amount * 100,


recipient:
recipient.data.data.recipient_code,


reason:
"Wallet withdrawal"


});



res.json(transfer.data);



}

catch(error){


res.status(500).json({

message:
"Withdrawal failed",

error:
error.response?.data ||
error.message

});


}



});



module.exports = router;
