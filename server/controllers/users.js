const express = require('express');
const usersLogic = require('../logic/users');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route     POST api/users/register
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

    let newUser = req.body;
    newUser = { ...newUser, type: 'USER' };

    try {
      const successfulRegisterData = await usersLogic.register(newUser);
      res.json(successfulRegisterData);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     POST api/users/login
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

    const user = req.body;

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
