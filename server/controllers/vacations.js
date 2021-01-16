const express = require('express');
const vacationsLogic = require('../logic/vacations');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

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

// @route     GET api/vacations/:id
// @desc      Get vacations by id
// @access    Public
router.get('/:id', async (req, res, next) => {
  const vacationId = req.params.id;
  try {
    const vacation = await vacationsLogic.getVacationById(vacationId);
    res.json(vacation);
  } catch (error) {
    return next(error);
  }
});

// @route     POST api/vacations
// @desc      Create a vacation
// @access    Admin
router.post('/', auth, admin, async (req, res, next) => {
  let newVacation = req.body;
  newVacation = {
    ...newVacation,
    startDate: new Date(newVacation.startDate),
    endDate: new Date(newVacation.endDate),
    followers: 0,
  };

  try {
    await vacationsLogic.addVacation(newVacation);
    res.send('Vacation created');
  } catch (error) {
    return next(error);
  }
});

// @route     DELETE api/vacations/:id
// @desc      Delete a vacation
// @access    Admin
router.delete('/:id', auth, admin, async (req, res, next) => {
  const vacationId = req.params.id;

  try {
    const allVacations = await vacationsLogic.deleteVacation(vacationId);
    res.json(allVacations);
  } catch (error) {
    return next(error);
  }
});

// @route     PUT api/vacations/:id
// @desc      Modify a vacation
// @access    Admin
router.put('/:id', auth, admin, async (req, res, next) => {
  const vacationId = req.params.id;
  let modifiedVacation = req.body;
  modifiedVacation = {
    ...modifiedVacation,
    startDate: new Date(modifiedVacation.startDate),
    endDate: new Date(modifiedVacation.endDate),
  };

  try {
    await vacationsLogic.modifyVacation(vacationId, modifiedVacation);
    res.send('Vacation modified');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
