const express = require('express');
const followedVacationsLogic = require('../logic/followedVacations');
const router = express.Router();

// @route     POST api/followed-vacations
// @desc      Follow a vacation
// @access    Private
router.post('/', async (req, res, next) => {
  const { vacationId, token } = req.body;

  try {
    const newFollowedVacationId = await followedVacationsLogic.followVacation(vacationId, token);
    res.json(newFollowedVacationId);
  } catch (error) {
    return next(error);
  }
});

// @route     GET api/followed-vacations
// @desc      Get all followed vacations by user
// @access    Private
router.get('/', async (req, res, next) => {
  const token = req.header('x-auth-token');
  try {
    const newFollowedVacationId = await followedVacationsLogic.followVacation(vacationId, token);
    res.json(newFollowedVacationId);
  } catch (error) {
    return next(error);
  }
});

/*SELECT 
	id, destination, description, followed_vacations.vacation_id
FROM 
	vacations v
LEFT JOIN
	(SELECT vacation_id FROM followed_vacations WHERE user_id = '17') followed_vacations
ON
	v.id = followed_vacations.vacation_id
WHERE 
	id = followed_vacations.vacation_id */

module.exports = router;
