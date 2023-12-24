const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const Grid = require('gridfs-stream');
const GridFS = Grid(mongoose.connection, mongoose.mongo);
const {college,projects} = require('../settings/env.js');

const app = express();
app.use(express.static('./public'));
const cors=require("cors")
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
       catch(error)
       {
        
        console.log("error",error);
       }
    
}
const projectlist = async(req,res)=>{
    let {category,search,college_name,sort_by,order,page} = req.query
    console.log(req.query)
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
        console.log(catquery,clgquery,sortquery)
        const projlists = await projects.find({$and:[clgquery,catquery]}).sort(sortquery).select('photo Project_Name Description')
        console.log(l_limit,u_limit)
        const a=~~((projlists.length)/10)
        console.log(projlists[0])
        res.json({list:projlists.slice(l_limit,u_limit),total_pages:a+1})
    }
}
const image = async(req, res) => {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    gfs.openDownloadStream(fileId).pipe(res);
};

module.exports = {
    getdata,
    projectlist,
    image,
};