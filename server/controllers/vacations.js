const express = require('express');
const vacationsLogic = require('../logic/vacations');
const router = express.Router();

// @route     GET api/vacations
// @desc      Get all vacations
// @access    Public
router.get('/', async (req, res, next) => {
  try {
    const allVacations = await vacationsLogic.getAllVacations();
    res.json(allVacations);
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/vacations
// @desc      Create a vacation
// @access    Private
router.post('/', async (req, res, next) => {
  let newVacation = req.body;
  newVacation = { ...newVacation, followers: 0 };

  try {
    const newVacationId = await vacationsLogic.addVacation(newVacation);
    res.json(newVacationId);
  } catch (error) {
    return next(error);
  }
});

// @route     DELETE api/vacations
// @desc      Delete a vacation
// @access    Private
router.post('/:id', async (req, res, next) => {
  let newVacation = req.body;
  newVacation = { ...newVacation, followers: 0 };

  try {
    const newVacationId = await vacationsLogic.addVacation(newVacation);
    res.json(newVacationId);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
