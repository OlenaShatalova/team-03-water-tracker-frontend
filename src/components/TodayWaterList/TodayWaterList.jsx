// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsAddWaterModalOpen } from '../../redux/water/waterSelectors';
// import { openModal } from '../../redux/water/waterSlice';
// import DailyWaterIntake from '../DailyWaterIntake/DailyWaterIntake';
// import AddWaterModal from '../AddWaterModal/AddWaterModal';

// import { selectWaterRecordsToday } from '../../redux/today/selectors';

// import { ReactSVG } from 'react-svg';
// import plus from '../../assets/icons/plus.svg';

// import css from './TodayWaterList.module.css';

// const TodayWaterList = () => {
//   const dispatch = useDispatch();
//   const isOpen = useSelector(selectIsAddWaterModalOpen);
//   const onAddWaterButton = () => {
//     dispatch(openModal('isAddWaterOpen'));
//   };
//   const todayRecord = useSelector(selectWaterRecordsToday);

//   return (
//     <div className={css.todayWaterListSectionWrapper}>
//       <h2 className={css.todayWaterListHeader}>Today</h2>

//       <div className={css.todayWaterListWrapper}>
//         {todayRecord.length > 0 && (
//           <ul className={css.scrollableList}>
//             {todayRecord.map(({ _id, waterVolume, time }) => (
//               <li className={css.waterRecordDataWrapper} key={_id}>
//                 <DailyWaterIntake
//                   record={{ id: _id, volume: waterVolume, time: time }}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <button className={css.todayWaterListBtn} onClick={onAddWaterButton}>
//         <ReactSVG src={plus} className={css.plusIcon} />
//         Add water
//       </button>

//       {isOpen && <AddWaterModal onClose={onAddWaterButton} />}
//     </div>
//   );
// };

// export default TodayWaterList;
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAddWaterModalOpen } from '../../redux/water/waterSelectors';
import { openModal } from '../../redux/water/waterSlice';
import { fetchWaterToday } from '../../redux/today/operations';
import DailyWaterIntake from '../DailyWaterIntake/DailyWaterIntake';
import AddWaterModal from '../AddWaterModal/AddWaterModal';
import { selectWaterRecordsToday } from '../../redux/today/selectors';

import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';
import css from './TodayWaterList.module.css';

import { useEffect } from 'react';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);
  const todayRecord = useSelector(selectWaterRecordsToday);
  console.log('todayRecord from useSelector:', todayRecord);

  // useEffect(() => {
  //   console.log('Dispatching fetchWaterToday...');
  //   dispatch(fetchWaterToday());
  // }, [dispatch]);
  // console.log('todayRecord:', todayRecord);

  useEffect(() => {
    if (todayRecord.length === 0) {
      // Тільки якщо немає даних, відправляти запит
      console.log('Dispatching fetchWaterToday...');
      dispatch(fetchWaterToday());
    }
  }, [dispatch, todayRecord.length]);

  const onAddWaterButton = () => {
    dispatch(openModal('isAddWaterOpen'));
  };

  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>

      <div className={css.todayWaterListWrapper}>
        {todayRecord.length > 0 ? (
          <ul className={css.scrollableList}>
            {todayRecord.map(({ _id, waterVolume, time }) => (
              <li className={css.waterRecordDataWrapper} key={_id}>
                <DailyWaterIntake
                  record={{ id: _id, volume: waterVolume, time: time }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No records today.</p>
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
