const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const User = require('./models/User');
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(async () => {
  const users = await User.find();
  console.log('=== ALL USERS ===');
  users.forEach(u => console.log(`ID: ${u._id} | Name: ${u.name} | Email: ${u.email} | Role: ${u.role}`));
  
  const fallou = users.find(u => u.name.toLowerCase().includes('fallou'));
  
  if (fallou) {
    console.log('\n=== FALLOU INFO ===');
    console.log('ID:', fallou._id.toString());
    console.log('Name:', fallou.name);
    console.log('Email:', fallou.email);
    console.log('Role:', fallou.role);
    
    const enrollments = await Enrollment.find({ student: fallou._id }).populate('course', 'title');
    console.log('\n=== FALLOU ENROLLMENTS ===');
    enrollments.forEach(e => {
      console.log(`Course: ${e.course?.title} | isActive: ${e.isActive} | endDate: ${e.endDate} | course._id: ${e.course?._id}`);
    });
  }
  
  const courses = await Course.find();
  console.log('\n=== ALL COURSES ===');
  courses.forEach(c => console.log(`ID: ${c._id} | Title: ${c.title}`));
  
  // Check all enrollments
  const allEnrollments = await Enrollment.find().populate('course', 'title').populate('student', 'name');
  console.log('\n=== ALL ENROLLMENTS ===');
  allEnrollments.forEach(e => {
    console.log(`Student: ${e.student?.name} | Course: ${e.course?.title} | isActive: ${e.isActive} | endDate: ${e.endDate} | course._id: ${e.course?._id}`);
  });
  
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
