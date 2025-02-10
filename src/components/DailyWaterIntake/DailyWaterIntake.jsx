import { useState } from 'react';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal.jsx';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';

import css from './DailyWaterIntake.module.css';

import { ReactSVG } from 'react-svg';
import cup from '../../assets/icons/cup.svg';
import pencilsquare from '../../assets/icons/pencilsquare.svg';
import trash from '../../assets/icons/trash.svg';

const DailyWaterIntake = ({ _id, waterVolume, time }) => {
  const [isTodayListModalOpen, setIsTodayListModalOpen] = useState(false);
  const [isDeleteWaterModalOpen, setIsDeleteWaterModalOpen] = useState(false);

  const openTodayListModal = () => setIsTodayListModalOpen(true);
  const closeTodayListModal = () => setIsTodayListModalOpen(false);

  const openDeleteWaterModal = () => setIsDeleteWaterModalOpen(true);
  const closeDeleteWaterModal = () => setIsDeleteWaterModalOpen(false);

  return (
    <div className={css.dailyWaterWrapper}>
      <div className={css.dailyWaterDataWrapper}>
        <ReactSVG src={cup} className={css.cupIcon} />
        <p className={css.dailyWaterVolume}>{waterVolume} ml</p>
        <p className={css.dailyWaterTime}>{time} time</p>
      </div>
      <div className={css.dailyWaterBtnWrapper}>
        <button className={css.dailyWaterEditBtn} onClick={openTodayListModal}>
          <ReactSVG src={pencilsquare} className={css.pencilsquareIcon} />
        </button>
        <button
          className={css.dailyWaterDeleteBtn}
          onClick={openDeleteWaterModal}
        >
          <ReactSVG src={trash} className={css.trashIcon} />
        </button>
      </div>

      <TodayListModal
        isOpen={isTodayListModalOpen}
        onRequestClose={closeTodayListModal}
      />

      <DeleteWaterModal
        isOpen={isDeleteWaterModalOpen}
        onRequestClose={closeDeleteWaterModal}
        id={_id}
      />
    </div>
  );
};

export default DailyWaterIntake;
