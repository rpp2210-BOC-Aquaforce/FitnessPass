import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type StarsProps = {
  ratingValues: number,
  handleRatingChange?: (ratingValue: number) => void
};

export default function Stars({ ratingValues, handleRatingChange } : StarsProps) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    const starClass = i <= ratingValues ? 'text-mint-orange' : 'text-gray-300';
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        data-testid={`star-${i}`}
        className={`text-m w-4 h-4 ${starClass}`}
        onClick={() => {
          if (handleRatingChange) {
            handleRatingChange(i);
          }
        }}
        style={{ cursor: 'pointer' }}
      />,
    );
  }

  return stars;
}
