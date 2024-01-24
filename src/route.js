const router = require('express').Router();

const { Router } = require('express');
const {signin, signup, hrsignup, fpassword, validate_token, checkSessionEndpoint , newuser, newhr, newp, signup_college, mailpass,departments,get_departments,collegeDetails,getCollegeDetails,getCompanyDetails,companyDetails,getsignupCollege,homepage,getSkill,getteam} = require('./controllers/login.js')
const {getdata,projectlist,image,getstudata,getprojectdata,fetchprojdata,addbookmark,removebookmark,checkbookmark,validateurl, getDomainProjects,getstudentdetails,getstudentproject,addcomment,getskillproject,getrandomproject} = require('./controllers/mainpage.js')
const {details} = require('./controllers/upload.js');
/** HTTP Reqeust */
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/newuser', newuser);
router.post('/fpassword',fpassword)
router.post('/newp',newp)
router.get('/checkSessionEndpoint',checkSessionEndpoint)
router.post('/validate-token/:token',validate_token)
router.post('/signup_college',signup_college)
router.post('/mailpass',mailpass)
router.post('/departments',departments);
router.get('/departments',get_departments);
router.post('/college-details',collegeDetails)
router.get('/college-details',getCollegeDetails);
router.get('/signup_college',getsignupCollege);
router.get('/data',getdata);
router.get('/projects',projectlist)
router.get('/image/:id',image)
router.post('/hrsignup', hrsignup);
router.post('/newhr', newhr);
router.post('/getstudendata',getstudata)
router.post('/getprojectdata',getprojectdata)
router.post('/fetchprojdata',fetchprojdata)
router.post('/company-details',companyDetails)
router.get('/company-details',getCompanyDetails);
router.post('/removebookmark',removebookmark);
router.post('/addbookmark',addbookmark);
router.post('/checkbookmark',checkbookmark);
router.get('/validateurl',validateurl);
router.post("/main",homepage);
router.get("/getskills",getSkill);
router.get("/getteam",getteam);
router.get("/getdomainbyclick",getDomainProjects);
router.post('/uploadDetails',details);
router.get("/getstudentproject",getstudentproject);
router.post("/addcomment",addcomment);
router.get("/getskillprj",getskillproject);
router.get("/getstudentdetails",getstudentdetails);
router.get("/getrandomprj",getrandomproject);

module.exports = router;