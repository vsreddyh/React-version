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
app.use(bodyParser.json({ limit: '50mb' }));
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
      maxAge: 6 * 60 * 60 * 1000,
      rolling:true
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