const express = require('express');
const cors = require('cors');
const { MongoClient, GridFSBucket } = require('mongodb');
const bodyParser = require('body-parser');
const retry = require('retry'); // Importing the retry library
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
const{projects,Course,url}=require('../settings/env.js');
const { ObjectId } = require('mongodb');

const mongoURI = url;
const databaseName = 'projectpalace';

// Create a MongoClient without the poolSize option
const client = new MongoClient(mongoURI);

let db;

// Function to connect to MongoDB with retry logic
async function connectWithRetry() {
  const operation = retry.operation({
    retries: 5, // Number of retries
    factor: 2, // Exponential backoff factor
    minTimeout: 1000, // Minimum timeout in milliseconds
    maxTimeout: 5000, // Maximum timeout in milliseconds
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async () => {
      try {
        await client.connect();
        db = client.db(databaseName);
        console.log('MongoDB connected successfully');
        resolve();
      } catch (err) {
        if (operation.retry(err)) {
          console.error('Error connecting to MongoDB, retrying...');
          return;
        }
        reject(err);
      }
    });
  });
}

connectWithRetry().catch(error => {
  console.error('MongoDB connection error:', error);
});


const details = async (req, res) => {
  try {
    if (!db) {
      throw new Error('MongoDB connection not established.');
    }

    const { file, filename, video, videoname, photos, photoname, title, description, languages, domain, profilePhoto, teams } = req.body;
    let photoIds = [];
    let videoId;
    let profilePhotoId;

    let updatedTeams = teams.map(student => {
      return {
        _id: new mongoose.Types.ObjectId(student._id),
        student_name: student.student_name
      };
    });

    let studentIds = updatedTeams.map(ite => ite._id);

    // Upload file to GridFS
    const uploadFile = async (data, name) => {
      const buffer = Buffer.from(data, 'base64');
      const bucket = new GridFSBucket(db);
      const uploadStream = bucket.openUploadStream(name);
      const fileId = uploadStream.id;

      await new Promise((resolve, reject) => {
        uploadStream.end(buffer, (error) => {
          if (error) {
            console.error(`Error uploading ${name}:`, error);
            reject(error);
          } else {
            console.log(`${name} uploaded successfully, stored under id:`, fileId);
            resolve(fileId);
          }
        });
      });

      return fileId;
    };

    const uploadPhotoPromises = photos.map(async (photo, i) => {
      const photoId = await uploadFile(photo, `photo_${i}`);
      photoIds.push(photoId);
    });

    videoId = videoname ? await uploadFile(video, videoname) : null;
    profilePhotoId = profilePhoto ? await uploadFile(profilePhoto, 'profilePhoto') : null;

    // Save project details to MongoDB
    const course = new projects({
      Domain: domain,
      Skills: languages,
      College: req.session.loggedInCollege,
      Project_Name: title.charAt(0).toUpperCase() + title.slice(1),
      Likes: 0,
      Description: description,
      Date: new Date(),
      photo: profilePhotoId,
      Video: videoId,
      Students: updatedTeams,
      photos: photoIds,
      File: await uploadFile(file, filename),
      versionkey: false
    });

    await course.save();
    console.log("Project details saved successfully");

    const projectId = new mongoose.Types.ObjectId(course._id);

    // Update skills for students
    for (const studentId of studentIds) {
      await updateStudentSkills(studentId, languages, domain, projectId);
    }

    res.status(200).json({ message: "Project details saved successfully" });
  } catch (error) {
    console.error("Error uploading project details:", error);
    res.status(500).json({ error: "Error uploading project details" });
  }
};

const updateStudentSkills = async (studentId, newSkills, domain, projectId) => {
  try {
    const studentsCollection = db.collection('students');
    const student = await studentsCollection.findOne({ _id: studentId });

    if (student) {
      const existingSkills = new Set(student.skills);
      newSkills.forEach(skill => existingSkills.add(skill)); // Add new skills avoiding duplicates

      const updatedDomains = Array.from(new Set([...student.Domains, domain])); // Add new domain avoiding duplicates

      await studentsCollection.updateOne(
        { _id: studentId },
        {
          $set: {
            skills: [...existingSkills],
            projects: [...student.projects, projectId],
            Domains: updatedDomains
          }
        }
      );
      console.log(`Skills, projects, and domain updated for student with ID: ${studentId}`);
    } else {
      console.log(`Student with ID ${studentId} not found`);
    }
  } catch (error) {
    console.error('Error updating student skills, projects, and domain:', error);
  }
};

module.exports = {
  details
};
