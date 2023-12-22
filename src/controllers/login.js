const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const cors=require("cors")
const bodyParser = require('body-parser');
const session = require('express-session');
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD, JWT_SECRET, SESSION_KEY,Course,college,Department} = require('../settings/env.js');
require('dotenv').config();



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



const getsignupCollege=async(req,res)=>
{
    
    try{
        const term1=req.query.term;
        const regex1 =new RegExp(term1,'i');
        const colleges=await college.find({college_name:regex1}).select('college_name').limit(10);
        const suggestions1=colleges.map(college=>college.college_name);
        res.json(suggestions1);
    
    }
    catch(err)
    {
        console.error('Error retrieving colleges:',err);
        res.status(500).json({error:'Error in retriveing colleges'});

    }



}

//SESSION_CHECKER
const checkSessionEndpoint = async(req,res)=>{
    if (req.session.loggedInemail) {
        // If the user is logged in (session contains loggedInUser), serve main-page.html
        res.json(req.session.loggedInemail);
    } else {
        // If not logged in, serve signin.html
        res.json("continue")
    }
}
//colege send mailer

const signup_college = async(req,res)=>{
    
    const CollegeName  = req.body.serverCollegeName;
    try {
        // Find the document based on the provided college name
        const result = await college.findOne({ college_name: CollegeName });
        //console.log(result.password)
        if (result.password !== undefined) {
            // User already has a password
            res.json({message: "User already registered", CollegeName: "null"});
        }
        else if (result) {
        const username = result.email_address;
        //mail has found
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
        };
        let transporter = nodemailer.createTransport(config);
                let MailGenerator = new Mailgen({
                    theme: "default",
                    product: {
                        name: "PROJECT PALACE",
                        link: 'https://mailgen.js/'
                    },
                });
                let response = {
                body: {
                    name: CollegeName,
                    intro: "Please click on the following link to set your password:",
                    action: {
                        instructions: "Click the button below to set your password:",
                        button: {
                            color: "#22BC66",
                            text: "Set your password",
                            link: `http://localhost:3000/set-password/ne/${token}`
                        }
                    },
                    outro: "If you did not request to set a password, no further action is required on your part.",
                },
            };
            let mail = MailGenerator.generate(response);
            let message = {
                from: EMAIL,
                to: username,
                subject: "Your OTP for Verification",
                html: mail,
            };
            transporter.sendMail(message)
            res.json({message:"Mail Sent"});


        } else {
        res.status(404).json({ error: 'College not found' });
        }
    }
    catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

//LINK-MAILER
const signup = async(req,res)=>{
    const { username } = req.body;
    async function checkStudent(mail) {
        const courses = await Course.find({ email_address: mail });
        const result = await college.find({ email_address: mail });
        if (courses.length !== 0) {
            return null; // User found
        }
        else if (result.length!==0){
            return null;
        }
        return 1;
    }
    async function create(req, res) {
        var email_1 = await checkStudent(username);
        if (email_1 === null) {
            res.json({message:"User Already Exists",username:"null"})
        }
        else {
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            };
            let transporter = nodemailer.createTransport(config);
            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "PROJECT PALACE",
                    link: 'https://mailgen.js/'
                },
            });
            let response = {
                body: {
                    name: "USER",
                    intro: "Please click on the following link to set your password:",
                    action: {
                        instructions: "Click the button below to set your password:",
                        button: {
                            color: "#22BC66",
                            text: "Set your password",
                            link: `http://localhost:3000/set-password/nu/${token}`
                        }
                    },
                    outro: "If you did not request to set a password, no further action is required on your part.",
                },
            };
            let mail = MailGenerator.generate(response);
            let message = {
                from: EMAIL,
                to: username,
                subject: "Your OTP for Verification",
                html: mail,
            };
            transporter.sendMail(message)
            res.json({message:"Mail Sent"})
        }
    }
    create(req,res);
}
    



//LOGIN
const signin = async(req,res)=>{
    async function checkStudent(mail) {
        const courses = await Course.find({ email_address: mail });
        const result = await college.findOne({ email_address: mail });
        if (courses.length !== 0) {
            return [courses[0].password,0];
        }
        if(result.length!==0){
            return [result.password,1];
        }
        return NULL;
        
    }

    async function signin(req, res) {
        const { username, password } = req.body;

        var userPassword = await checkStudent(username);

        bcrypt.compare(password, userPassword[0], (err, result) => {
            if (userPassword === null) {
                res.json({message:'User Not found'})
            } else if (result) {
                res.json({ message: 'Login successful', user: { username: username },checkstudent:userPassword[1] });
            } else {
                res.json({message:'Wrong Password', user: username })
            }
        })
    }
    signin(req,res)
}

//token validation
const validate_token = function(req, res) {
    console.log("hello");
    var token = req.params.token;
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if (err){
            if (err.name === 'TokenExpiredError') {
                res.json({message: 'Token expired', email: 'null'});
            } else{
                res.json({message: 'Invalid token', email: 'null'});
            }} 
        else {
            res.json({message: 'verified', email: decoded.username});
            req.session.loggedInemail=decoded.username
            console.log(decoded.username);
        }
    });
};
//college mail registartion
const mailpass = async(req,res)=>{
    const {mail, password, cpassword } = req.body;
    const fromdb=await college.findOne({'email_address':mail});
    if(password!==cpassword){
        res.json({message:'Passwords are not same'})
    }
    else {
        bcrypt.hash(password, 8, async (err, hash) => {

            const result = await college.updateOne(
                { 'email_address': mail }, 
                { $set: { 'password': hash } }
            );
            res.send({message:'ok'});
        
    });

    }

    
}

//NEW-USER
const newuser = async(req,res)=>{
    
    const {mail,username, password, cpassword } = req.body;
    const mails = await Course.find({ email_address: mail });
    const courses = await Course.find({ student_name: username });
    if (mails.length!==0){
        res.json({message:'Mail already registered'})
    } else if (password !== cpassword){
        res.json({message:'Passwords are not same'})
    } else if (courses.length !== 0){
        res.json({message:'Username Taken'})
    }
     else{
        console.log(mail)
        bcrypt.hash(password, 8, (err, hash) => {
        const course = new Course({
            student_name : username,
            email_address : mail,
            password : hash,
            versionKey: false
        })
        course.save();
        req.session.loggedInemail=mail
        res.json({message:'success'});
        });
    }
    req.session.loggedInemail=mail;
    
}




//send mail
const fpassword = async(req,res)=>{
    const { username } = req.body;
    async function checkStudent(mail) {
        const courses = await Course.find({ email_address: mail });
        if (courses.length === 0) {
            return null; // User not found
        }
        return courses[0].password;
    }
    async function create(req, res) {
        var email_1 = await checkStudent(username);

        if (email_1 === null) {
            res.json({message:'User does not exist'});
        }
        else {
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '10m' });
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            };
            let transporter = nodemailer.createTransport(config);

            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "PROJECT PALACE",
                    link: 'https://mailgen.js/'
                },
            });
            let response = {
                body: {
                    name: "USER",
                    intro: "Please click on the following link to set your new password:",
                    action: {
                        instructions: "Click the button below to set your new password:",
                        button: {
                            color: "#22BC66",
                            text: "Set your new password",
                            link: `http://localhost:3000/set-password/np/${token}`
                        }
                    },
                    outro: "If you did not request to set a new password, no further action is required on your part.",
                },
            };
        
            let mail = MailGenerator.generate(response);
        
            let message = {
                from: EMAIL,
                to: username,
                subject: "Your OTP for Verification",
                html: mail,
            };
            transporter.sendMail(message)
            res.json({message:"Mail Sent"});
        }
    }
    create(req,res);
}

//new-password
const newp = async(req,res)=>{
    const {mail, password, cpassword } = req.body;
    if (password !== cpassword){
        res.json({message:'Passwords are not same'})
    } 
    else{
        let user = await Course.findOne({ email_address: mail});
        bcrypt.hash(password, 8, (err, hash) => {
            user.password=hash
            user.save();
            res.json({message:'success'});
        });
    }
}
//department update
const departments =async(req,res)=>{
    const mail = req.session.loggedInemail; // Get the email from session
    console.log(mail)
    const result = req.body.department;
    
    try {
        const user = await Course.findOne({ email_address:mail}); // Find user by email
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

}
//department suggestions
const get_departments = async(req,res)=>{
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

}
//suggest colleges
const getCollegeDetails = async(req,res)=>{
    try{
        const term1=req.query.term1;
        const regex1 =new RegExp(term1,'i');
        const colleges=await college.find({college_name:regex1}).select('college_name').limit(10);
        const suggestions1=colleges.map(college=>college.college_name);
        res.json(suggestions1);
    
    }
    catch(err)
    {
        console.error('Error retrieving colleges:',err);
        res.status(500).json({error:'Error in retriveing colleges'});

    }

}
//save collegedetails
const collegeDetails = async(req,res)=>{
    const mail = req.session.loggedInemail; // Get the email from session
    const result = req.body.college;
    
    try {
        const user = await Course.findOne({ email_address:mail}); // Find user by email
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
}
module.exports = {
    signin,
    checkSessionEndpoint,
    signup,
    validate_token,
    newp,
    fpassword,
    newuser,
    mailpass,
    signup_college,
    departments,
    get_departments,
    collegeDetails,
    getCollegeDetails,
    getsignupCollege
};