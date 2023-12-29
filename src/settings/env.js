const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
url='mongodb+srv://Project:Florencemidhebaramvesam@project.tbx2krn.mongodb.net/projectpalace'
mongoose.connect(url);
const loginSchema = new mongoose.Schema({
    student_name : String,
    email_address : String,
    password : String,
    field_name:String,
    college_name:String,
    photo:ObjectId,
    projects:[ObjectId],
    Description:String,
    skills:[String],
    Domains:[String]
},{ versionKey: false });
const collegeSchema = new mongoose.Schema({
    college_name: String,
    email_address: String,
    password:String,
  });
const hrSchema = new mongoose.Schema({
    hr_name : String,
    email_address : String,
    password : String,
    company_name:String,
},{ versionKey: false });
const departmentSchema=new mongoose.Schema({
    field_name:String,
},{ versionKey: false });
const companySchema=new mongoose.Schema({
    company_name:String,
},{ versionKey: false });
const projectschema = new mongoose.Schema({
    Domain:String,
    Skills:String, //change in future
    College:String,
    Project_Name:String,
    Likes:Number,
    Description:String,
    Date:Date,
    state:String,
    photo:ObjectId,
    Students:String, //change in future
});

const Course = mongoose.model('student', loginSchema);
const recruiter = mongoose.model('head_recruiter', hrSchema);
const college=mongoose.model('college',collegeSchema);
const Department =mongoose.model('feild',departmentSchema);
const companies =mongoose.model('companie',companySchema);
const projects = mongoose.model('project',projectschema);
module.exports = {
    EMAIL : 'freemovies5247@gmail.com',
    PASSWORD : 'btjqbzhxpulroavl',
    JWT_SECRET :  'bV5zN2xZ4vU9nW6xZ7aB1vD3kF6gH8jK',
    SESSION_KEY : '9a3jKL$#3jfk4kljg%2f7sJ@*Lmn2J7H',
    Course:Course,
    college:college,
    Department:Department,
    projects:projects,
    recruiter:recruiter,
    companies:companies,
    url:url,
}