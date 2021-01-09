import { Button, Card, Grid, IconButton, Tooltip } from '@material-ui/core';
import React, { useContext } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { Vacation } from '../../models/Vacation';
import noImage from '../../assets/images/no-image.png';
import { WindowContext } from '../../context/WindowContext';

interface VacationCardProps {
  vacation: Vacation;
}

export default function VacationCard({ vacation }: VacationCardProps) {
  const { windowWidth } = useContext(WindowContext);

  const { description, destination, imageUrl, price, followers, startDate, endDate } = vacation;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const image = imageUrl.length ? imageUrl : noImage;
  const maxLength = windowWidth > 768 ? 125 : 40;

  const duration = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

              <div className="vacation-card-star">
                <Tooltip title="Follow">
                  <IconButton className="star-button" aria-label="star">
                    <FavoriteBorderIcon className="star-icon" />
                  </IconButton>
                </Tooltip>
                <p>{followers}</p>
              </div>
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
