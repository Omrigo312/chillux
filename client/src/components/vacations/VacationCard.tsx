import { Button, Card, Grid, IconButton, Tooltip } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import { Vacation } from '../../models/Vacation';
import noImage from '../../assets/images/no-image.png';
import { WindowContext } from '../../context/WindowContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { VacationsContext } from '../../context/VacationsContext';

interface VacationCardProps {
  vacation: Vacation;
}

export default function VacationCard({ vacation }: VacationCardProps) {
  const { windowWidth } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);
  const { setVacations, followedVacations } = useContext(VacationsContext);

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
      return alert('You must be logged in to do that!');
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
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const onUnfollowButtonClicked = async () => {
    if (!authState.isAuthenticated) {
      return alert('You must be logged in to do that!');
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
      console.log(error);
      alert(error.response.data.message);
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
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const onModifyButtonClicked = () => {
    window.location.replace(`/modify-vacation/${id}`);
  };

  return (
    <Card className="vacation-card">
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
    </Card>
  );
}
