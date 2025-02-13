import { useDispatch, useSelector } from 'react-redux';

import { setCurrentDate } from '../../../redux/water/waterSlice';

import { ReactSVG } from 'react-svg';
import left from '../../../assets/icons/left.svg';
import right from '../../../assets/icons/right.svg';

import css from './CalendarPagination.module.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CalendarPagination = () => {
  const dispatch = useDispatch();

  const fetchAndSetDate = newDate => {
    dispatch(setCurrentDate(newDate.getTime()));
  };

  const currentDate = useSelector(state => state.water.currentDate);
  const dateObj = new Date(currentDate);
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    fetchAndSetDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    fetchAndSetDate(newDate);
  };

  return (
    <div className={css.container}>
      <button className={css.button} type="button" onClick={goToPreviousMonth}>
        <ReactSVG src={left} />
      </button>
      <p>
        {months[dateObj.getMonth()]}, {dateObj.getFullYear()}
      </p>

      <button className={css.button} type="button" onClick={goToNextMonth}>
        <ReactSVG src={right} />
      </button>
    </div>
  );
};

export default CalendarPagination;
