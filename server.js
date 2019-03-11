const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();
// const user = require('./routes/api/user')
// const profile = require('./routes/api/profile')
// const post = require('./routes/api/post')
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

// use routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

// listen to port
app.listen(port, console.log(`app is running on port ${port}`));
