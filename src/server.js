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
const {EMAIL, PASSWORD, JWT_SECRET, SESSION_KEY} = require('./settings/env.js');
require('dotenv').config();
app.use(cors())
app.get("/",cors(),(req,res)=>
{

})

mongoose.connect('mongodb://localhost:27017/projectpalace');

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
},{ versionKey: false });

const Course = mongoose.model('student', loginSchema);

//SESSION_CHECKER
app.get('/checkSessionEndpoint',async(req,res)=>{
    if (req.session.loggedInemail) {
        // If the user is logged in (session contains loggedInUser), serve main-page.html
        res.json(req.session.loggedInemail);
    } else {
        // If not logged in, serve signin.html
        res.json("continue")
    }
})

//LINK-MAILER
app.post("/en/signup",async(req,res)=>{
    const { username } = req.body;
    async function checkStudent(mail) {
        const courses = await Course.find({ email_address: mail });
        if (courses.length !== 0) {
            return null; // User found
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
})
    



//LOGIN
app.post("/en/signin",async(req,res)=>{
    async function checkStudent(mail) {
        const courses = await Course.find({ email_address: mail });
        if (courses.length === 0) {
            return null; // User not found
        }
        return courses[0].password;
    }

    async function signin(req, res) {
        const { username, password } = req.body;

        var userPassword = await checkStudent(username);
        bcrypt.compare(password, userPassword, (err, result) => {
            if (userPassword === null) {
                res.json({message:'User Not found'})
            } else if (result) {
                res.json({ message: 'Login successful', user: { username: username } });
            } else {
                res.json({message:'Wrong Password', user: username })
            }
        })
    }
    signin(req,res)
})

//token validation
app.post("/validate-token/:token", function(req, res) {
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
        }
    });
});

//NEW-USER
app.post("/en/newuser",async(req,res)=>{
    const {mail, username, password, cpassword } = req.body;
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
        email = req.session.loggedInemail
        bcrypt.hash(password, 8, (err, hash) => {
        const course = new Course({
            student_name : username,
            email_address : mail,
            password : hash,
            versionKey: false
        })
        course.save();
        req.session.loggedInemail=undefined;
        res.json({message:'success'});
        });
    }
})

//send mail
app.post("/en/fpassword",async(req,res)=>{
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
                    intro: "Please click on the following link to set your new password:",
                    action: {
                        instructions: "Click the button below to set your new password:",
                        button: {
                            color: "#22BC66",
                            text: "Set your new password",
                            link: `http://localhost:5000/set-password/np/${token}`
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
})
/*
//new-password
app.post("/",async(req,res)=>{
    const {password} = req.body;
    const {cpassword} = req.body;
    if (req.session.loggedInemail === undefined){
        res.redirect('/forgot-password.html?error=Session expired, Try again');
    } else if (password !== cpassword){
        res.redirect('/new_password.html?error=Passwords are not same');
    } 
    else{
        email = req.session.loggedInemail
        let user = await Course.findOne({ email_address: email});
        bcrypt.hash(password, 8, (err, hash) => {
        user.password=password
        user.save();
        req.session.loggedInemail=undefined;
        res.sendFile(path.join(__dirname, "../main-page.html"));
        });
    }
})
*/
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
app.listen(3000,function()
{
    console.log("server is running")
})