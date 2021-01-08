import { Button, Card, Grid, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { Vacation } from '../../models/Vacation';

interface VacationCardProps {
  vacation: Vacation;
}

export default function VacationCard({ vacation }: VacationCardProps) {
  const { id, description, destination, imageUrl, price, followers, startDate, endDate } = vacation;
  const maxLength = 150;
  return (
    <div style={{ display: 'grid', marginTop: '7rem' }}>
      <Card className="vacation-card">
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <div className="vacation-card-container">
              <img src={imageUrl} alt={destination} className="vacation-card-image" />
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="vacation-card-text">
              <div className="vacation-card-top">
                <div className="vacation-card-header">
                  <h2>Paris</h2>
                  <p className="vacation-card-date">5 days, 13-17/01/2020</p>
                </div>

                <div className="vacation-card-star">
                  <Tooltip title="Follow">
                    <IconButton className="star-button" aria-label="star">
                      <FavoriteBorderIcon className="star-icon" />
                    </IconButton>
                  </Tooltip>
                  <p>+17</p>
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
                <p>499$</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
