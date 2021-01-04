const express = require('express');
const usersLogic = require('../logic/users');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/register',
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
      const user = { email, password, type: 'USER' };
      console.log(user);
      res.json({ token: 'fdsfds', userType: 'USER' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     POST api/auth
// @desc      Login user
// @access    Public
router.post(
  '/login',
  [check('email', 'Please include a valid email').isEmail(), check('password', 'A password is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = { email, password, type: 'USER' };

    try {
      const successfulLoginData = await usersLogic.login(user);
      res.json(successfulLoginData);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
