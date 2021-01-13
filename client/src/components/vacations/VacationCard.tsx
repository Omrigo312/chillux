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
import axios from 'axios';
import { VacationsContext } from '../../context/VacationsContext';
import { handleError } from '../../utils/error';

interface VacationCardProps {
  vacation: Vacation;
  index: number;
}

export default function VacationCard({ vacation, index }: VacationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { windowWidth, addAlert } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);
  const { setVacations, followedVacations } = useContext(VacationsContext);
  const history = useHistory();

  const { id, description, destination, imageUrl, price, followers, startDate, endDate } = vacation;
  const [isFollowed, setIsFollowed] = useState(followedVacations.includes(id));
  const [followersState, setFollowersState] = useState(followers);

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const image = imageUrl.length ? imageUrl : noImage;
  const maxLength = windowWidth > 768 ? 125 : 40;

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

    const updatedFollowers = followers + 1;
    const body = JSON.stringify({ vacationId: id });
    setFollowersState(updatedFollowers);
    const body2 = JSON.stringify({ ...vacation, followers: updatedFollowers });

    try {
      await axios.post('http://localhost:3001/api/followed-vacations', body, config);
      await axios.put(`http://localhost:3001/api/vacations/${id}`, body2, config);

      setIsFollowed(true);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onUnfollowButtonClicked = async () => {
    if (!authState.isAuthenticated) {
      return setIsDialogOpen(true);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const updatedFollowers = followersState - 1;
    setFollowersState(updatedFollowers);
    const body = JSON.stringify({ ...vacation, followers: updatedFollowers });

    try {
      await axios.delete(`http://localhost:3001/api/followed-vacations/${id}`);
      await axios.put(`http://localhost:3001/api/vacations/${id}`, body, config);
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
      const res = await axios.delete(`http://localhost:3001/api/vacations/${id}`);
      setVacations(res.data);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onModifyButtonClicked = () => {
    history.push(`modify-vacation/${id}`);
  };

  const animationClass = index % 2 === 0 ? 'vacation-card enter-right' : ' vacation-card enter-left';

  return (
    <Card className={animationClass}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <div
            className="vacation-card-image"
            style={{ background: `url(${image}) no-repeat center center/cover`, height: '100%' }}
          ></div>
        </Grid>
        <Grid item xs={7}>
          <div className="vacation-card-text">
            <div className="vacation-card-top">
              <div className="vacation-card-header">
                <h2>{destination}</h2>
                <p className="vacation-card-date">
                  {duration(startDateObj, endDateObj)} days, {startDateObj.toLocaleDateString()} -{' '}
                  {endDateObj.toLocaleDateString()}
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
            <div className="vacation-card-mid">
              {description.length > maxLength ? (
                <div>{`${description.substring(0, maxLength)}...`}</div>
              ) : (
                <p>{description}</p>
              )}
              <span></span>
            </div>
            <div className="vacation-card-bottom">
              <Link to="/vacations/id" style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="contained" className="more-info-button">
                  More info
                </Button>
              </Link>
              <p>{price}$</p>
            </div>
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
