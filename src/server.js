const express = require('express');
const path = require('path');
const app = express();
const cors=require("cors")
const bodyParser = require('body-parser');
const approute=require("./route.js")

require('dotenv').config();
app.use(cors())
app.get("/",cors(),(req,res)=>
{

})



app.use(express.static('../build'));
app.use(bodyParser.json());
app.use("/en",approute);
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
app.listen(3000,function()
{
    console.log("server is running")
})