const router = require('express').Router();

const {signin, signup, fpassword, validate_token, checkSessionEndpoint , newuser, newp} = require('./controllers/login.js')

/** HTTP Reqeust */
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/newuser', newuser);
router.post('/fpassword',fpassword)
router.post('/newp',newp)
router.post('/checkSessionEndpoint',checkSessionEndpoint)
router.post('/validate-token/:token',validate_token)

module.exports = router;