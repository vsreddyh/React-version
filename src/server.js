const mongoose = require('mongoose');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const cors=require("cors")
const bodyParser = require('body-parser');
const session = require('express-session');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD, JWT_SECRET, SESSION_KEY} = require('./settings/env.js');
require('dotenv').config();
app.use(cors())
app.get("/",cors(),(req,res)=>
{

})

mongoose.connect('mongodb://127.0.0.1:27017/projectpalace');

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

const loginSchema = new mongoose.Schema({
    student_name : String,
    email_address : String,
    password : String,
    field_name:String,
    college_name:String,
},{ versionKey: false });
const CollegeSchema= new mongoose.Schema({
    college_name:String,
    email_address:String,
});
const departmentSchema=new mongoose.Schema({
    field_name:String,
});

const Course = mongoose.model('student', loginSchema);
const College = mongoose.model('college',CollegeSchema);
const Department =mongoose.model('feild',departmentSchema);


//department
app.get("/departments", async(req,res)=>
{
    try{
        const term=req.query.term;
        const regex=new RegExp(term,'i');
        const departments=await Department.find({field_name:regex}).select("field_name").limit(4);
        const suggestions=departments.map(department=>department.field_name);
        res.json(suggestions);
        
        
    }
    catch(err)
    {
        console.error("Error retrieving departments:",err);
        res.status(500).json({error:"Error retrieving departments"});
    }
});
app.post("/departments", async (req, res) => {
    const mail = req.session.loggedInemail; // Get the email from session
    const result = req.body.department;
    
    try {
        const user = await Course.findOne({ email_address:"stella.veronica2002@gmail.com"}); // Find user by email
        if (user) {
            user.field_name = result; // Update the field_name
            await user.save(); // Save changes to the database
            console.log("User saved:", user);
            res.json("user saved");
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user" });
    }
});

//college-details
app.get("/college-details",async (req,res)=>
{
   
    try{
        const term1=req.query.term1;
        const regex1 =new RegExp(term1,'i');
        const colleges=await College.find({college_name:regex1}).select('college_name').limit(10);
        const suggestions1=colleges.map(college=>college.college_name);
        res.json(suggestions1);
    
    }
    catch(err)
    {
        console.error('Error retrieving colleges:',err);
        res.status(500).json({error:'Error in retriveing colleges'});

    }
});
app.post("/college-details",async (req,res)=>
{
    const mail = req.session.loggedInemail; // Get the email from session
    const result = req.body.college;
    
    try {
        const user = await Course.findOne({ email_address:"stella.veronica2002@gmail.com"}); // Find user by email
        if (user) {
            user.college_name = result; // Update the field_name
            await user.save(); // Save changes to the database
            console.log("User saved:", user);
            res.json("user saved");
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user" });
    }
    
});


app.use("/en",approute);
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
app.listen(3000,function()
{
    console.log("server is running")
})