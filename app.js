require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require("express-fileupload");
const morgan = require('morgan');
const cors = require("cors");
const Routes = require('./src/routes');
const logger = require('./src/services/logger');
const { BASE_PATHS } = require('./src/services/constant');
const { PORT = 8259, SESSION_SECRET = 'SESSION_SECRET@123' } = process.env;

const app = express();

// Middleware
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));// Logs HTTP requests

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 600000,
    secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
    httpOnly: true, // Helps prevent cross-site scripting (XSS)
  },
}));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// View engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(`/public`, express.static(path.join(__dirname, 'public')));


app.get(`/`, function(req, res){
  return res.json({'success': true});
});

// routes
app.use(BASE_PATHS.COMPARISION, Routes.compsRoutes);
app.use(BASE_PATHS.USER, Routes.userRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
}); 

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the serverr
app.listen(PORT, (error) =>
  error
    ? logger.error('Error starting the server:', error)
    : console.log(`Server is running on port ${PORT}`)
);