const router = require('express').Router();

const {signin, signup, fpassword, validate_token, checkSessionEndpoint , newuser, newp, signup_college, mailpass,departments,get_departments,collegeDetails,getCollegeDetails,getsignupCollege} = require('./controllers/login.js')
const {getdata,projectlist,image} = require('./controllers/mainpage.js')

/** HTTP Reqeust */
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/newuser', newuser);
router.post('/fpassword',fpassword)
router.post('/newp',newp)
router.post('/checkSessionEndpoint',checkSessionEndpoint)
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
module.exports = router;