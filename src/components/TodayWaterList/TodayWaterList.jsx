import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../redux/modal/slice';
import DailyWaterIntake from '../DailyWaterIntake/DailyWaterIntake';
import AddWaterModal from '../AddWaterModal/AddWaterModal';

import { selectWaterRecordsToday } from '../../redux/today/selectors';
// import { selectIsAddWaterModalOpen } from "../../redux/modal/selectors";

import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';

import css from './TodayWaterList.module.css';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  // const isOpen = useSelector(selectIsAddWaterModalOpen);
  const isOpen = false;

  const waterRecords = useSelector(selectWaterRecordsToday);

  const handleOpenModal = () => {
    dispatch(openModal('isAddWaterOpen'));
  };

  const handleCloseModal = () => {
    dispatch(closeModal('isAddWaterOpen'));
  };

  return (
    <div className={css.todayWaterListSectionWrapper}>
      <h2 className={css.todayWaterListHeader}>Today</h2>

      <div className={css.todayWaterListWrapper}>
        {waterRecords.length > 0 && (
          <ul className={css.scrollableList}>
            {waterRecords.map(({ _id, waterVolume, time }) => (
              <li className={css.waterRecordDataWrapper} key={_id}>
                <DailyWaterIntake
                  record={{ id: _id, volume: waterVolume, time: time }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className={css.todayWaterListBtn} onClick={handleOpenModal}>
        <ReactSVG src={plus} className={css.plusIcon} />
        Add water
      </button>

      {isOpen && <AddWaterModal onClose={handleCloseModal} />}
    </div>
  );
};

export default TodayWaterList;
