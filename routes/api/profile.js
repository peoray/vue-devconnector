const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('profile works');
});

module.exports = router;
