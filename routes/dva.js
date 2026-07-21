const express = require("express");

const router = express.Router();

const paystack = require("../services/paystack");



router.post("/create", async(req,res)=>{


try{


const {
email,
first_name,
last_name,
phone
}=req.body;



const result =
await paystack.post(
"/dedicated_account",
{


customer:{

email,
first_name,
last_name,
phone

},


preferred_bank:
"wema-bank"



});


res.json(result.data);



}

catch(error){


res.status(500).json({

message:
"Failed creating account",

error:
error.response?.data ||
error.message

});


}



});



module.exports = router;
