const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  content: [{
    type: { type: String, enum: ['video', 'document', 'module'], required: true },
    title: { type: String, required: true },
    url: { type: String },
    description: { type: String },
    fullContent: { type: String }
  }],
  duration: { type: Number, default: 30 },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
