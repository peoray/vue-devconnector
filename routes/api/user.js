const router = require('express').Router();
const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route  GET /api/users/test
// @desc   show dummy data
// @access Public
router.get('/test', (req, res) => {
  res.send('user route works!');
});

// @route  GET /api/users/register
// @desc   Register user
// @access Public
router.post('/register', async (req, res) => {
  try {
    const { isValid, errors } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.email = 'Email already exists!';
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mn' // Defaukt
    });
    const newUser = new User({
      name,
      email,
      password,
      avatar
    });
    // bcrypt.genSalt(10, (error, salt) => {
    //   bcrypt.hash(newUser.password, salt, async (err, hash) => {
    //     if (err) {
    //       throw err;
    //     }
    //     newUser.password = hash;
    //     await newUser.save();
    //     res.json(newUser);
    //   });
    // });
    const hashedPassword = await User.hashPassword(password);
    newUser.password = hashedPassword;
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// @route  GET /api/users/login
// @desc   Login user / Returning JWT Token
// @access Public
router.post('/login', async (req, res) => {
  try {
    const { isValid, errors } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = 'User not found!';
      return res.status(404).json(errors);
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      errors.password = 'Password is incorrect';
      return res.status(400).json(errors);
    }
    const payload = { id: user.id, name: user.name, avatar: user.avatar };
    jwt.sign(payload, process.env.JWTKEY, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: `Bearer ${token}` });
    });
    // return res.status(200).json({ msg: 'success' });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (isMatch) {
    //   return res.status(200).json({ msg: 'success' });
    // }
    // return res.status(400).json({ password: 'password is incorrect' });
  } catch (error) {
    console.log(error);
  }
});

// @route  GET /api/users/current
// @desc   Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
);
module.exports = router;
