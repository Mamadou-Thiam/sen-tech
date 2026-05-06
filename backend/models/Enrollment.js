const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

EnrollmentSchema.pre('save', function(next) {
  if (this.startDate && this.course) {
    const courseDuration = this.course.duration || 30;
    this.endDate = new Date(this.startDate.getTime() + courseDuration * 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
