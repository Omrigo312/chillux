const express = require('express');
const usersLogic = require('../logic/users');
const router = express.Router();
const auth = require('../middleware/auth');

// @route    GET api/users
// @desc     Authenticate user
// @access   Public
router.get('/', auth, async (req, res, next) => {
  try {
    if (req.user.id) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post('/', async (req, res, next) => {
  let newUser = req.body;
  newUser = { ...newUser, type: 'USER' };

  try {
    const newUserId = await usersLogic.register(newUser);
    res.json(newUserId);
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/users/login
// @desc      Login user
// @access    Public
router.post('/login', async (req, res, next) => {
  const user = req.body;

  if (user.googleId) {
    const successfulLoginData = await usersLogic.googleLogin(user);
    return res.json(successfulLoginData);
  }

  try {
    const successfulLoginData = await usersLogic.login(user);
    res.json(successfulLoginData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
