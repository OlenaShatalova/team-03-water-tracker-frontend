import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/selectors';

import CalendarPagination from './CalendarPagination/CalendarPagination';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import Calendar from './Calendar/Calendar';

import css from './MonthStatsTable.module.css';

const MonthStatsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const wasOpenedByClick = useRef(false);
  const modalRef = useRef();

  const activeDay = useSelector(state => state.water.activeDay);
  const waterPerMonth = useSelector(
    state => state.water.waters?.waterPerMonth || []
  );
  const { dailyNorm } = useSelector(selectUser);

  const [day, month] = activeDay ? activeDay.split('.') : [null, null];

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

  const openModal = () => {
    setIsModalOpen(true);
    wasOpenedByClick.current = isMobile; // Запам'ятовуємо, чи було відкриття через клік
  };

  const closeModal = () => {
    setIsModalOpen(false);
    wasOpenedByClick.current = false;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscPress = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className={css.container}>
      <div className={css.containerPag}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination />
      </div>

      <div
        ref={modalRef}
        className={css.modalWrapper}
        onMouseEnter={!isMobile ? openModal : undefined}
        onMouseLeave={
          !isMobile && !wasOpenedByClick.current ? closeModal : undefined
        }
        onClick={isMobile ? () => setIsModalOpen(prev => !prev) : undefined}
      >
        {isModalOpen && (
          <DaysGeneralStats
            date={activeDay}
            dailyNorm={dailyNorm}
            percent={activeDayData.percentage}
            portions={activeDayData.consumptionCount}
          />
        )}
      </div>

      <Calendar openModal={openModal} />
    </div>
  );
};

export default MonthStatsTable;
