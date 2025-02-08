import { useDispatch, useSelector } from 'react-redux';
import { selectIsAddWaterModalOpen } from "../../redux/water/waterSelectors";
import { openModal } from "../../redux/water/waterSlice";
import DailyWaterIntake from '../DailyWaterIntake/DailyWaterIntake';
import AddWaterModal from '../AddWaterModal/AddWaterModal';

import { selectWaterRecordsToday } from '../../redux/today/selectors';

import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';

import css from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);
  const onAddWaterButton = () => {
      dispatch(openModal("isAddWaterOpen"))
      console.log("Modal window is opened!")
  }
  const todayRecord = useSelector(selectWaterRecordsToday);
  
  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>

      <div className={css.todayWaterListWrapper}>
        {todayRecord.length > 0 && (
          <ul className={css.scrollableList}>
            {todayRecord.map(({ _id, waterVolume, time }) => (
              <li className={css.waterRecordDataWrapper} key={_id}>
                <DailyWaterIntake
                  record={{ id: _id, volume: waterVolume, time: time }}
                />
              </li>
            ))}
          </ul>
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
