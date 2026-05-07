const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL, 'https://sen-tech-frontend.onrender.com']
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/enrollments', require('./routes/enrollments'));

app.get('/', (req, res) => {
  res.json({ message: 'API SEN TECH PLATFORM est en ligne' });
});

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.NODE_ENV === 'production'
  ? (process.env.MONGO_URI_PROD || process.env.MONGO_URI)
  : (process.env.MONGO_URI_DEV || process.env.MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB:', err));
