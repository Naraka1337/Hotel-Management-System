import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, CardActions, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/hotels/${hotel.id}/reviews`);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel?.name || 'Hotel Name'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel?.address || 'Hotel Address'}
        </Typography>
        {hotel?.rating && (
          <Rating value={hotel.rating} precision={0.5} readOnly />
        )}
        <Typography variant="body2" color="text.secondary">
          {hotel?.description || 'No description available'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleReviewClick}>
          View Reviews
        </Button>
        <Button size="small" color="primary" variant="contained">
          Book Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

HotelCard.defaultProps = {
  hotel: {
    id: '1',
    name: 'Sample Hotel',
    address: '123 Hotel St, City',
    rating: 4.5,
    description: 'A wonderful place to stay during your travels.'
  }
};

export default HotelCard;