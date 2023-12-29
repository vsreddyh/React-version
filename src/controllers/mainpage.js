const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Grid = require('gridfs-stream');
const GridFS = Grid(mongoose.connection, mongoose.mongo);
const {college,projects,Course} = require('../settings/env.js');

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/projectpalace');
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
});


const getdata = async(req,res)=>{
    try{
        const term=req.query.term;
        const regex=new RegExp(term,"i");
        const colleges=await college.find({college_name:regex}).select("college_name").limit(10);
        const sugesstions=colleges.map(college=>college.college_name);
        res.json(sugesstions);
    }
    catch(error){
        console.log("error",error);
    }
    
}
const projectlist = async(req,res)=>{
    // console.log(req.session)
    let {category,search,college_name,sort_by,order,page} = req.query
    searchquery={Skills:search}
    catquery={Domain:category}
    clgquery={College:college_name}
    sortquery={}
    u_limit=page*10
    l_limit=u_limit-10
    if (search===''){
        if (category==='Any'){
            catquery={}
        }
        if (college_name==='Any'){
            clgquery={}
        }
        if (order==='true'){
            order=1
        }
        else{
            order=-1
        }
        if (sort_by==='Name'){
            sortquery={Project_Name:order}
        }
        else if (sort_by==='Likes'){
            sortquery={Likes:order}
        }
        else if (sort_by==='Upload Date'){
            sortquery={Date:order}
        }
        const projlists = await projects.find({$and:[clgquery,catquery]}).sort(sortquery).select('photo Project_Name Description')
        const a=~~((projlists.length)/10)
        let m;
        if (projlists.length===0){
            m=2;
        }
        else{
            m=0;
        }
        res.json({list:projlists.slice(l_limit,u_limit),total_pages:a+1,display:m})
    }
}
const image = async(req, res) => {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    gfs.openDownloadStream(fileId).pipe(res);
};
const getstudata = async(req,res)=>{
    const data =req.body.data;
    const studentId = new mongoose.Types.ObjectId(data);
    const stinfo = await Course.findOne({_id:studentId});
    res.json(stinfo)
}
const fetchprojdata = async(req,res)=>{
    const datas = req.body.data;
    const array = [];
    for(let key in datas){
        let data = datas[key];
        let projId = new mongoose.Types.ObjectId(data);
        let projinfo = await projects.findOne({_id:projId});
        array.push(projinfo)
    }
    res.json(array)
}
module.exports = {
    getdata,
    projectlist,
    image,
    getstudata,
    fetchprojdata,
};