const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

// create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

// hash password before saving to db
module.exports.hashPassword = async password => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Hashing failed ', error);
  }
};
// compare password in db and user password input (login)
module.exports.comparePassword = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error('comparing failed', error);
  }
};
