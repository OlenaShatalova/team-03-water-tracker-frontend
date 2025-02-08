import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import css from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setActiveDay } from '../../redux/water/waterSlice';
import { selectUser } from '../../redux/auth/selectors';


const MonthStatsTable = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
  
  const activeDay = useSelector(state => state.water.activeDay);
  const modalRef = useRef(null);
  const user = useSelector(selectUser);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscPress);

    
    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [closeModal]); 
  return (
    <div>
      <div className={css.container}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination />
      </div>

      {isModalOpen && (
        <div ref={modalRef} className={css.modalWrapper}>
          <DaysGeneralStats
            date={activeDay}
            dailyNorm={user.dailyNorm}
            percent={3}
            portions={3}
          />
        </div>
      )}

      <Calendar openModal={openModal} />
    </div>
  );
};

export default MonthStatsTable;
