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

  const onOpenModal = () => {
    dispatch(openModal('isWaterRateOpen'));
    console.log('Modal window is opened!');
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.containerForNumbers}>
        <div className={css.number}>{waterRate ? waterRate : '1.5 L'}</div>
        <button onClick={onOpenModal} className={css.button}>
          Edit
        </button>
      </div>
      {isOpen && <DailyNormaModal />}
    </div>
  );
};

export default DailyNorma;
