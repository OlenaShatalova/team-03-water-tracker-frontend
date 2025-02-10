import { useDispatch } from 'react-redux';

import { setActiveDay } from '../../../redux/water/waterSlice';

import css from './CalendarItem.module.css';

const CalendarItem = ({ percentage = 0, day, isActive, onClick }) => {
  const dispatch = useDispatch();

  const numericPercentage = parseFloat(percentage);

  const containerStyle = {
    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg)',
    color: isActive ? 'var(--color-bg)' : 'var(--color-text)',
    border:
      numericPercentage < 100
        ? '1px solid var(--color-accent-dark-orange)'
        : 'none',
  };

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
