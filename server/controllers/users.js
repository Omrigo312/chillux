const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = { email, password, type: 'user' };
      console.log(user);
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
