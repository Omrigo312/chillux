import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import image from '../../assets/images/logo-circle.png';

export default function OfferCard() {
  return (
    <div style={{ display: 'grid', justifyContent: 'center', marginTop: '7rem' }}>
      <Card style={{ maxWidth: 1000, maxHeight: 250 }}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <CardMedia image={image} title="Contemplative Reptile" style={{ height: 250 }} />
          </Grid>
          <Grid item xs={5}>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
              except Antarctica
            </Typography>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
