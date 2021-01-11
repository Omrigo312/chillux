const followedVacationsDao = require('../dao/followedVacations');

const followVacation = async (vacationId, userId) => {
  const followedVacationId = await followedVacationsDao.followVacation(vacationId, userId);
  return followedVacationId;
};

const unfollowVacation = async (vacationId, userId) => {
  await followedVacationsDao.unfollowVacation(vacationId, userId);
};

const getFollowedVacations = async (userId) => {
  const followedVacations = await followedVacationsDao.getFollowedVacations(userId);
  return followedVacations;
};

module.exports = {
  followVacation,
  unfollowVacation,
  getFollowedVacations,
};
