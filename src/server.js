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
app.use(bodyParser.json({ limit: '50mb' })); //limit limits the data which can be uploaded to server.js from frontend
app.get("/",cors(),(req,res)=>
{

})
var store = new MongoDBStore({
  uri: url,
  collection: 'mySessions'
});

app.use(session({
  secret: SESSION_KEY,
  resave: false,
  store: store,
  saveUninitialized: false,
  cookie: {
      secure: false,
      maxAge: 6 * 60 * 60 * 1000, //6 hours
      rolling:true //whenever session is modified it resets expirytime
  }
}));
app.use(express.static('../build'));

app.use("/en",approute);//routing to all functions

//checks if session is expired
app.get("/checksessionexpiry",async(req,res)=>{
  a=req.session.loggedInemail
  if(a!==undefined){
      res.json(1)
  }
  else{
      res.json(0)
  }
})


app.listen(3000,function(req,res)
{
    console.log("server is running")
})

//if route didnt match in above functions it will be redirected to app.jsx through this function
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});