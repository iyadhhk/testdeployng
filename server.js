const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mosqueRoute = require('./routes/mosquee.routes');
const proprietaireRoute = require('./routes/proprietaire.routes');
const connectDB = require('./config/db');

const app = express();
connectDB();
// set static folder
app.use(express.static('client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//connect Bd

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ extended: false }));

app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/mosquees', mosqueRoute);
app.use('/proprietaire', proprietaireRoute);

// custom error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(statusCode).json({ message, data });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
