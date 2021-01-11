const express = require('express');
const followedVacationsLogic = require('../logic/followedVacations');
const router = express.Router();
const auth = require('../middleware/auth');

// @route     POST api/followed-vacations
// @desc      Follow a vacation
// @access    Private
router.post('/', auth, async (req, res, next) => {
  const { vacationId } = req.body;
  const userId = req.user.id;

  try {
    const newFollowedVacationId = await followedVacationsLogic.followVacation(vacationId, userId);
    res.json(newFollowedVacationId);
  } catch (error) {
    return next(error);
  }
});

// @route     DELETE api/followed-vacations/id
// @desc      Unfollow a vacation
// @access    Private
router.delete('/:id', auth, async (req, res, next) => {
  const vacationId = req.params.id;
  const userId = req.user.id;

  try {
    await followedVacationsLogic.unfollowVacation(vacationId, userId);
    res.json({ message: 'Vacation unfollowed' });
  } catch (error) {
    return next(error);
  }
});

// @route     GET api/followed-vacations
// @desc      Get all followed vacations by user
// @access    Private
router.get('/', auth, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const followedVacations = await followedVacationsLogic.getFollowedVacations(userId);
    res.json(followedVacations.map((vacation) => (vacation = vacation.id)));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
