const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title duration');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course')
      .populate('course.category');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId, startDate, duration } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Formation non trouvée' });

    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      startDate: startDate || new Date(),
      isActive: true
    });

    if (duration) {
      enrollment.endDate = new Date(enrollment.startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    }

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.extendEnrollment = async (req, res) => {
  try {
    const { days } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Inscription non trouvée' });

    const currentEnd = enrollment.endDate || new Date();
    enrollment.endDate = new Date(currentEnd.getTime() + days * 24 * 60 * 60 * 1000);
    enrollment.isActive = true;
    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inscription supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
