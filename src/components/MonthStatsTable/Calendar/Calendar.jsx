import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWaterPerMonth } from '../../../redux/water/waterOperations';
import { setActiveDay } from '../../../redux/water/waterSlice';
import {
  selectCurrentDate,
  selectWaterPerMonth,
  selectWaterRateNumber,
} from '../../../redux/water/waterSelectors';
import { selectUser } from '../../../redux/auth/selectors';

import CalendarItem from '../CalendarItem/CalendarItem';

import css from './Calendar.module.css'; // Подключение стилей (если они есть)

const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = ({ openModal }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const dateObj = new Date(currentDate);
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  // const user = useSelector(selectUser);
  // const waterRate = useSelector(selectWaterRateNumber);
  const waterPerMonth = useSelector(selectWaterPerMonth);

  const activeDay = useSelector(state => state.water.activeDay);

  // const calculateFeasibility = (dayData, user) => {
  //   if (!dayData || !dayData.length) return 0;

  //   const totalPortions = dayData.reduce(
  //     (sum, record) => sum + (record.consumptionCount || 0),
  //     0
  //   );

  //   const userWaterRateInMl = user.dailyNorm * 1000;

  //   const totalWaterConsumed = totalPortions * 250;

  //   const percentage =
  //     totalWaterConsumed >= userWaterRateInMl
  //       ? 100
  //       : Math.round((totalWaterConsumed / userWaterRateInMl) * 100);

  //   return percentage;
  // };

  const handleDayClick = day => {
    const formattedDay = `${String(day).padStart(2, '0')}.${String(
      month + 1
    ).padStart(2, '0')}.${year}`;
    openModal();
    dispatch(setActiveDay(formattedDay));
    // dispatch(fetchWaterPerDay(formattedDay));
  };

  // Массив дней месяца
  const arrayOfDays = Array.from(
    { length: daysInMonth(month, year) },
    (_, index) => index + 1
  );
  // console.log(arrayOfDays.length);

  useEffect(() => {
    const date = new Date(currentDate);
    const formattedDate = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    dispatch(
      fetchWaterPerMonth({
        month: formattedDate.month,
        year: formattedDate.year,
      })
    );
  }, [dispatch, currentDate]);

  return (
    <div>
      <ul className={css.list}>
        {arrayOfDays.map(day => {
          const dayString = String(day - 1);
          const activeDayString = `${String(day).padStart(2, '0')}.${String(
            month + 1
          ).padStart(2, '0')}.${year}`;
          const dayData = waterPerMonth[dayString];
          // console.log(`Day: ${day}, Data:`, dayData);
          const percentage =
            dayData && dayData.percentage ? dayData.percentage : '0%';

          return (
            <li className={css.item} key={dayString}>
              <CalendarItem
                day={day}
                waterData={dayData}
                percentage={percentage}
                onClick={() => handleDayClick(day)}
                isActive={activeDay === activeDayString}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;
