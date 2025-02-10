import { useDispatch, useSelector } from 'react-redux';

import { setCurrentDate } from '../../../redux/water/waterSlice';
// import { fetchWaterPerMonth } from '../../../redux/water/waterOperations';

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
    // const localDate = newDate.toLocaleDateString();
    // const year = newDate.getFullYear();
    // const month = newDate.getMonth() + 1;
    dispatch(setCurrentDate(newDate.getTime()));
    // dispatch(fetchWaterPerMonth({ month, year }));
  };

  const currentDate = useSelector(state => state.water.currentDate);
  // console.log(currentDate);
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
        <img src={left} alt="" />
      </button>
      <p>
        {months[dateObj.getMonth()]}, {dateObj.getFullYear()}
      </p>

      <button className={css.button} type="button" onClick={goToNextMonth}>
        <img src={right} alt="" />
      </button>
    </div>
  );
};

export default CalendarPagination;
