import { useState } from 'react';
import { FaStar } from "react-icons/fa";

// Passed noOfStars as a prop with a default value of 5
const StarRating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(id) {
    setRating(id);
  }

  function handleMouseEnter(id) {
    setHover(id);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="star-rating" style={{ display: 'flex', gap: '5px' }}>
      {/* // Creating a new array based on number of stars */}
      {[...Array(noOfStars)].map((_, index) => {
        const starId = index + 1; 

        return (
          <FaStar
            key={starId}
            onClick={() => handleClick(starId)}
            onMouseEnter={() => handleMouseEnter(starId)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
            style={{ cursor: 'pointer',
              color: starId <= (hover || rating) ? '#ffc107' : '#e4e5e9'
            }}
          />
        );
      })}
    </div>
  );
}

export default StarRating;