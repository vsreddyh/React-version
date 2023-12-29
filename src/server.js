const express = require('express');
const path = require('path');
const app = express();
const cors=require("cors")
const session = require('express-session');
const bodyParser = require('body-parser');
const approute=require("./route.js")
var MongoDBStore = require('connect-mongodb-session')(session);


require('dotenv').config();
const {SESSION_KEY,url} = require('./settings/env.js');
app.use(cors())
app.get("/",cors(),(req,res)=>
{

})
var store = new MongoDBStore({
  uri: url,
  collection: 'mySessions'
});

app.use(session({
  secret: SESSION_KEY, // Replace with a strong secret for session encryption
  resave: false,
  store: store,
  saveUninitialized: false,
  cookie: {
      secure: false, // Set it to true if your app is served over HTTPS
      maxAge: 8 * 60 * 60 * 1000 // 8 hours (session expiration time)
  }
}));
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