const followedVacationsDao = require('../dao/followedVacations');
const vacationsDao = require('../dao/vacations');

const followVacation = async (vacationId, userId) => {
  const vacation = await vacationsDao.getVacationById(vacationId);
  const updatedFollowers = vacation.followers + 1;
  const modifiedVacation = { ...vacation, followers: updatedFollowers };
  await vacationsDao.modifyVacation(vacationId, modifiedVacation);
  await followedVacationsDao.followVacation(vacationId, userId);
  return updatedFollowers;
};

const unfollowVacation = async (vacationId, userId) => {
  const vacation = await vacationsDao.getVacationById(vacationId);
  const updatedFollowers = vacation.followers - 1;
  const modifiedVacation = { ...vacation, followers: updatedFollowers };
  await vacationsDao.modifyVacation(vacationId, modifiedVacation);
  await followedVacationsDao.unfollowVacation(vacationId, userId);
  return updatedFollowers;
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
