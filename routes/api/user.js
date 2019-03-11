const router = require('express').Router();

// @route  GET /api/users
// @desc   show dummy data
// @access Public
router.get('/', (req, res) => {
  res.send('hello world!');
});

module.exports = router;
