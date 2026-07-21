require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors());
app.use(express.json());



// Test route
app.get("/", (req,res)=>{
    res.send("Wallet Backend Running Successfully");
});



// Routes

const dva = require("./routes/dva");
const withdrawal = require("./routes/withdrawal");


app.use("/api/dva", dva);
app.use("/api/withdraw", withdrawal);




// Server start

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(
        `Server running on port ${PORT}`
    );
});
