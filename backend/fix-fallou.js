const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const User = require('./models/User');
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(async () => {
  const fallou = await User.findOne({ name: 'Fallou Dioum' });
  const course = await Course.findOne();
  
  console.log('Fallou ID:', fallou._id.toString());
  console.log('Course ID:', course._id.toString());
  
  const rawEnrollments = await Enrollment.find({ student: fallou._id });
  console.log('\n=== RAW ENROLLMENTS ===');
  rawEnrollments.forEach(e => {
    console.log('enrollment._id:', e._id);
    console.log('course field (raw):', e.course);
    console.log('course type:', typeof e.course);
    console.log('isActive:', e.isActive);
    console.log('endDate:', e.endDate);
  });
  
  // Fix: Update Fallou's enrollment with the correct course ID
  const result = await Enrollment.updateMany(
    { student: fallou._id },
    { course: course._id }
  );
  console.log('\n=== FIXED ===');
  console.log('Updated:', result.modifiedCount, 'enrollments');
  
  // Verify
  const verifyEnrollments = await Enrollment.find({ student: fallou._id }).populate('course', 'title');
  console.log('\n=== VERIFIED ===');
  verifyEnrollments.forEach(e => {
    console.log('Course:', e.course?.title, '| isActive:', e.isActive, '| course._id:', e.course?._id);
  });
  
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
