import { useDispatch } from 'react-redux';
import { setActiveDay } from '../../../redux/water/waterSlice';
import css from './CalendarItem.module.css';

const CalendarItem = ({ percentage = 0, day, isActive, onClick }) => {
  const numericPercentage = parseFloat(percentage);
  const containerStyle = {
    backgroundColor: isActive
      ? '#323f47'
      : numericPercentage < 100
      ? '#fff'
      : '#FFFFFF',
    color: isActive ? '#FFFFFF' : '#000000',
    border: numericPercentage < 100 ? '1px solid #ff9d43' : 'none',
  };
  const dispatch = useDispatch();

  // console.log(percentage);
  const handleClick = () => {
    dispatch(setActiveDay(day));
    onClick();
  };

  return (
    <div className={css.container}>
      <button
        className={css.button}
        style={containerStyle}
        onClick={handleClick}
      >
        {day}
      </button>
      <p className={css.text}>{percentage}</p>
    </div>
  );
};

export default CalendarItem;
