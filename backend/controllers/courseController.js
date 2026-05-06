const Course = require('../models/Course');
const Category = require('../models/Category');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category');
    if (!course) return res.status(404).json({ message: 'Formation non trouvée' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price, content } = req.body;
    const course = new Course({ title, description, category, duration, price, content });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Formation supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
