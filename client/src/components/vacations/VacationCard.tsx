import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import { Link, useHistory } from 'react-router-dom';
import { Vacation } from '../../models/Vacation';
import noImage from '../../assets/images/logo-no-image.png';
import { WindowContext } from '../../context/WindowContext';
import { AuthContext } from '../../context/AuthContext';
import { VacationsContext } from '../../context/VacationsContext';
import { handleError } from '../../utils/error';
import { app } from '../../utils/axiosConfig';

interface VacationCardProps {
  vacation: Vacation;
  index: number;
}

export default function VacationCard({ vacation, index }: VacationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addAlert } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);
  const { setVacations, followedVacations } = useContext(VacationsContext);
  const history = useHistory();

  const { id, description, destination, imageUrl, price, followers, startDate, endDate } = vacation;
  const [isFollowed, setIsFollowed] = useState(followedVacations.includes(id));
  const [followersState, setFollowersState] = useState(followers);

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const image = imageUrl.length ? imageUrl : noImage;

  const duration = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const onFollowButtonClicked = async () => {
    if (!authState.isAuthenticated) {
      return setIsDialogOpen(true);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ vacationId: id });

    try {
      const res = await app.post('followed-vacations', body, config);
      const updatedFollowers = res.data.updatedFollowers;
      setFollowersState(updatedFollowers);
      setIsFollowed(true);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onUnfollowButtonClicked = async () => {
    if (!authState.isAuthenticated) {
      return setIsDialogOpen(true);
    }

    try {
      const res = await app.delete(`followed-vacations/${id}`);
      const updatedFollowers = res.data.updatedFollowers;
      setFollowersState(updatedFollowers);
      setIsFollowed(false);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onDeleteButtonClicked = async () => {
    if (!window.confirm('Are you sure you want to permanently remove this vacation?')) {
      return;
    }

    try {
      const res = await app.delete(`vacations/${id}`);
      setVacations(res.data);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onModifyButtonClicked = () => {
    history.push(`/modify-vacation/${id}`);
  };

  const animationClass = index % 2 === 0 ? 'vacation-card enter-right' : ' vacation-card enter-left';

  return (
    <Card className={animationClass}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={5} style={{ height: '100%' }}>
          <div style={{ background: `url(${image}) no-repeat center center/cover`, height: '100%' }}></div>
        </Grid>
        <Grid item xs={7} style={{ alignSelf: 'center', height: '90%' }}>
          <div className="vacation-card-text">
            <div className="vacation-card-top">
              <p>{price}$</p>

              <div className="vacation-card-header">
                <h2>{destination}</h2>
                <p className="vacation-card-date">
                  {duration(startDateObj, endDateObj)} days, {startDateObj.toLocaleDateString('en-GB')} -{' '}
                  {endDateObj.toLocaleDateString('en-GB')}
                </p>
              </div>

              {authState.userType === 'ADMIN' ? (
                <div className="vacation-card-star">
                  <Tooltip title="Modify">
                    <IconButton onClick={onModifyButtonClicked} className="star-button" aria-label="modify">
                      <CreateIcon className="modify-icon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={onDeleteButtonClicked} className="star-button" aria-label="delete">
                      <DeleteOutlineIcon className="delete-icon" />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div className="vacation-card-star">
                  {isFollowed ? (
                    <Tooltip title="Unfollow">
                      <IconButton onClick={onUnfollowButtonClicked} className="star-button" aria-label="unfollow">
                        <FavoriteIcon className="star-icon-active" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="follow">
                      <IconButton onClick={onFollowButtonClicked} className="star-button" aria-label="follow">
                        <FavoriteBorderIcon className="star-icon" />
                      </IconButton>
                    </Tooltip>
                  )}

                  <p>{followersState}</p>
                </div>
              )}
            </div>
            <div className="vacation-card-mid">{description}</div>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="not-logged-in"
        aria-describedby="must-be-logged-in"
      >
        <DialogTitle id="not-logged-in">{'You must be logged in to do that.'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="must-be-logged-in">
            Please <Link to="/login">log in</Link> to get the best experience possible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
