// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';

import { openModal } from '../../redux/water/waterSlice';
import { selectDailyNorm } from '../../redux/auth/selectors';
import { selectIsWaterRateModalOpen } from '../../redux/water/waterSelectors';

import css from './DailyNorma.module.css';

const DailyNorma = () => {
  const dispatch = useDispatch();

  const dailyNorm = useSelector(selectDailyNorm);
  // console.log({ dailyNorm });

  const isOpen = useSelector(selectIsWaterRateModalOpen);

  const waterInLiters = dailyNorm / 1000;

  const onOpenModal = () => {
    dispatch(openModal('isWaterRateOpen'));
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.containerForNumbers}>
        <div className={css.number}>{waterInLiters} L</div>
        <button onClick={onOpenModal} className={css.button}>
          Edit
        </button>
      </div>
      {isOpen && <DailyNormaModal />}
    </div>
  );
};

export default DailyNorma;
