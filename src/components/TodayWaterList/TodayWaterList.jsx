import { useDispatch, useSelector } from 'react-redux';

import DailyWaterIntake from '../DailyWaterIntake/DailyWaterIntake';
import AddWaterModal from '../AddWaterModal/AddWaterModal';

import { openModal } from '../../redux/water/waterSlice';
import { selectIsAddWaterModalOpen } from '../../redux/water/waterSelectors';
import { selectWaterToday } from '../../redux/water/waterSelectors';

import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';
import css from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);
  const todayRecord = useSelector(selectWaterToday);
  console.log('todayRecord from useSelector:', todayRecord);

  console.log({ isOpen, todayRecord });

  const onAddWaterButton = () => {
    dispatch(openModal('isAddWaterOpen'));
  };

  const formatTime = isoString => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>

      <div className={css.todayWaterListWrapper}>
        {todayRecord.length > 0 ? (
          <ul className={css.scrollableList}>
            {todayRecord.map(({ _id, waterVolume, date }) => (
              <li className={css.waterRecordDataWrapper} key={_id}>
                <DailyWaterIntake
                  _id={_id}
                  waterVolume={waterVolume}
                  time={formatTime(date)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.noRecords}>No records today</p>
        )}
      </div>

      <button className={css.todayWaterListBtn} onClick={onAddWaterButton}>
        <ReactSVG src={plus} className={css.plusIcon} />
        Add water
      </button>

      {isOpen && <AddWaterModal onClose={onAddWaterButton} />}
    </div>
  );
};

export default TodayWaterList;

// useEffect(() => {
//   console.log('Dispatching fetchWaterToday...');
//   dispatch(fetchWaterToday());
// }, [dispatch]);
// console.log('todayRecord:', todayRecord);

// useEffect(() => {
//   if (todayRecord.length === 0) {
//     // Тільки якщо немає даних, відправляти запит
//     console.log('Dispatching fetchWaterToday...');
//     dispatch(fetchWaterToday());
//   }
// }, [dispatch, todayRecord.length]);
