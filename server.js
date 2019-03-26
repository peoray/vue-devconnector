const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
require('./models/User');
require('./config/passport')(passport);

// moongose config
mongoose.Promise = global.Promise;
// connect to mongoose
mongoose
  .connect('mongodb://localhost:27017/devconnector', {
    useNewUrlParser: true
  })
  .then(() => console.log('You are connected!'))
  .catch(err => {
    console.log(`Error: ${err}`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(passport.initialize());

// use routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

// listen to port
app.listen(port, console.log(`app is running on port ${port}`));
