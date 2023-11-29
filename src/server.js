const express = require('express');
const path = require('path');
const app = express();
const cors=require("cors")
const bodyParser = require('body-parser');
const session = require('express-session');
const {EMAIL, PASSWORD, JWT_SECRET, SESSION_KEY} = require('./settings/env.js');
const approute = require('./route.js');
require('dotenv').config();

app.use(cors())
app.get("/",cors(),(req,res)=>
{

})
app.use(express.static('../build'));
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_KEY, // Replace with a strong secret for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set it to true if your app is served over HTTPS
        maxAge: 60 * 60 * 1000 // 1 day (session expiration time)
    }
}));

app.use("/en",approute);

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
app.listen(3000,function()
{
    console.log("server is running")
})