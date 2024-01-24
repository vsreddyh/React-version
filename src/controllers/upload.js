const express = require('express');
const cors = require('cors');
const { MongoClient, GridFSBucket } = require('mongodb');
//const AdmZip = require('adm-zip');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

const mongoURI = 'mongodb://localhost:27017';
const databaseName = 'upload-form';

let db;
const client = new MongoClient(mongoURI);

client.connect()
  .then(() => {
    db = client.db(databaseName);
    console.log('MongoDB connected successfully');
    console.log("ikkada unna nenu");
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const details = async (req, res) => {
  app.use(bodyParser.json({ limit: '50mb' }));


  try {
    if (!db) {
      throw new Error('MongoDB connection not established.');
    }

    const { file,filename,video,videoname,photos,photoname,title,description,languages,domain,profilePhoto,teams } = req.body;
    console.log(domain);
    console.log(title);
    console.log(filename);
    console.log(videoname)
    console.log(languages);
    console.log(teams)
    const buffer = Buffer.from(file, 'base64');

    const bucket = new GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(filename);
    const zipFileid = uploadStream.id;

    uploadStream.end(buffer, (error) => {
      if (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
      } else {
        console.log('File uploaded successfully, stored under file id:',zipFileid);
      }
    });
if(videoname.length!=0){
    const buffer2 = Buffer.from(video, 'base64');

  const bucket2 = new GridFSBucket(db);
  const uploadStream2 = bucket2.openUploadStream(videoname);
  const videoId = uploadStream2.id;

  uploadStream2.end(buffer2, (error) => {
    if (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file');
    } else {
      console.log('File uploaded successfully, stored under video id:',videoId);
    }
  });
}

if (photos && photos.length > 0) {
  console.log("i am here");
  const photoIds = [];
  console.log(photos.length);

  for (let i = 0; i < photos.length; i++) {
    const buffer = Buffer.from(photos[i], 'base64');

    const bucket = new GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(`photo_${i}`);
    const photoId = uploadStream.id;

    uploadStream.end(buffer, (error) => {
      if (error) {
        console.error('Error uploading photo:', error);
      } else {
        console.log(`Photo ${i + 1} uploaded successfully, stored under photo id:`, photoId);
        photoIds.push(photoId);
      }
    });
  }
}


if(profilePhoto){
  const buffer4 = Buffer.from(profilePhoto, 'base64');

const bucket4 = new GridFSBucket(db);
const uploadStream4 = bucket4.openUploadStream("profilePhoto");
const profilePhotoId = uploadStream4.id;

uploadStream4.end(buffer4, (error) => {
  if (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  } else {
    console.log('File uploaded successfully, stored under profilePhoto id:',profilePhotoId);
  }
});
}



  }catch(error){
    console.log("Error Uploading Data",error);
  }

};


module.exports={
    details
}