import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/selectors';

import CalendarPagination from './CalendarPagination/CalendarPagination';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import Calendar from './Calendar/Calendar';

import css from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeDay = useSelector(state => state.water.activeDay);
  const waterPerMonth = useSelector(
    state => state.water.waters?.waterPerMonth || []
  );
  const { dailyNorm } = useSelector(selectUser);

  const modalRef = useRef(null);

  const [day, month] = activeDay ? activeDay.split('.') : [null, null, null];

  const monthNames = [
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

  const getMonthName = month => monthNames[Number(month) - 1];

  const formattedDay =
    day && month ? { day: Number(day), month: getMonthName(month) } : null;

  const activeDayData =
    formattedDay && Array.isArray(waterPerMonth)
      ? waterPerMonth.find(
          entry =>
            entry.date.day === formattedDay.day &&
            entry.date.month === formattedDay.month
        ) || { dailyNorm: '0', percentage: '0%', consumptionCount: 0 }
      : { dailyNorm: '0', percentage: '0%', consumptionCount: 0 };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleEscPress = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, []);

  return (
    <div className={css.container}>
      <div className={css.containerPag}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination />
      </div>

      {isModalOpen && (
        <div ref={modalRef} className={css.modalWrapper}>
          <DaysGeneralStats
            date={activeDay}
            dailyNorm={dailyNorm}
            percent={activeDayData.percentage}
            portions={activeDayData.consumptionCount}
          />
        </div>
      )}

      <Calendar openModal={openModal} />
    </div>
  );
};

export default MonthStatsTable;
