import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/water/waterSlice';
import {
  selectIsWaterRateModalOpen,
  selectWaterRateNumber,
} from '../../redux/water/waterSelectors';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import css from './DailyNorma.module.css';

const DailyNorma = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsWaterRateModalOpen);
  const waterRate = useSelector(selectWaterRateNumber);
  // якщо немає значення, використовуємо 1500
  const dailyNorma = waterRate ?? 1500;
  // const dailyNorma = response?.data?.dailyNorm ?? 1500;
  const waterInLiters = dailyNorma / 1000;

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
