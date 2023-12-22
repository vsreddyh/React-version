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
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
const cors=require("cors")
const conn = mongoose.createConnection('mongodb://localhost:27017/projectpalace');
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
});


const getdata = async(req,res)=>{
    const {state}=req.query;
    let statequery={state:state}
    if (state==='Any'){
        res.json();
    }
    const list = await college.find(statequery).select('college_name');
    const suggestions = list.map(college => college.college_name);
    res.json(suggestions);
}
const projectlist = async(req,res)=>{
    let {category,search,state,college_name,sort_by,order,page} = req.query
    console.log(req.query)
    searchquery={Skills:search}
    catquery={Domain:category}
    statequery={State:state}
    clgquery={College:college_name}
    sortquery={}
    u_limit=page*10
    l_limit=u_limit-10
    if (search===''){
        if (category==='Any'){
            catquery={}
        }
        if (state==='Any'){
            statequery={}
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
        console.log(catquery,statequery,clgquery,sortquery)
        const projlists = await projects.find({$and:[statequery,clgquery,catquery]}).sort(sortquery).select('_id photo Project_Name Description')
        console.log(l_limit,u_limit)
        const a=~~((projlists.length)/10)
        console.log(a)
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