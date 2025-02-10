import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/water/waterSlice';
import {
  selectIsWaterRateModalOpen,
  selectWaterRateNumber,
} from '../../redux/water/waterSelectors';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import css from './DailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import { fetchWaterRate } from '../../redux/water/waterOperations';

const DailyNorma = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsWaterRateModalOpen);
  const waterRate = useSelector(selectWaterRateNumber);
  console.log("waterRate:", waterRate)
  const user = useSelector(selectUser);
  console.log("from user:", user.dailyNorm)

  useEffect(() => {
    if (user.dailyNorm) {
      dispatch(fetchWaterRate(user.dailyNorm)).unwrap(); // Оновлюємо waterRate після зміни user.dailyNorm
    }
  }, [user.dailyNorm, dispatch]);
  const waterInLiters = user.dailyNorm / 1000;

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
