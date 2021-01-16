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
      const user = await usersLogic.getUserById(req.user.id);
      return res.json(user);
    }
    res.send(false);
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

// @route     PUT api/users/password
// @desc      Change user's password
// @access    Private
router.put('/password', auth, async (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.user.id;

  try {
    await usersLogic.changePassword(userId, newPassword);
    res.send('Password updated!');
  } catch (error) {
    return next(error);
  }
});

// @route     PUT api/users/name
// @desc      Update user's name
// @access    Private
router.put('/name', auth, async (req, res, next) => {
  const fullName = req.body;
  const userId = req.user.id;

  try {
    await usersLogic.updateName(userId, fullName);
    res.send('Name updated!');
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/users/confirm-password
// @desc      Confirm user's password
// @access    Private
router.post('/confirm-password', auth, async (req, res, next) => {
  const password = req.body.password;
  const userId = req.user.id;

  try {
    await usersLogic.confirmPassword(userId, password);
    res.send('Password confirmed');
  } catch (error) {
    return next(error);
  }
});

// @route     DELETE api/users
// @desc      Remove user
// @access    Private
router.delete('/', auth, async (req, res, next) => {
  const userId = req.user.id;

  try {
    await usersLogic.deleteUser(userId);
    res.send('User removed');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
