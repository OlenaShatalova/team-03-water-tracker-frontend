import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DailyNormaModalForm from '../DailyNormaModalForm/DailyNormaModalForm';

import { closeModal } from '../../redux/water/waterSlice';
import { selectIsWaterRateModalOpen } from '../../redux/water/waterSelectors';

import close from '../../assets/icons/close.svg';

import css from './DailyNormaModal.module.css';
import { ReactSVG } from 'react-svg';
// import Submit from "../DailyNormaModalForm/Submit.jsx";

const DailyNormaModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsWaterRateModalOpen);
  const onModalClose = useCallback(() => {
    dispatch(closeModal('isWaterRateOpen'));
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // для закриття модалки на esc
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onModalClose]);

  if (!isOpen) return null;

  return (
    <div onClick={onModalClose} className={css.modalOverlay}>
      <div onClick={e => e.stopPropagation()} className={css.modal}>
        <div className={css.containerForTitleAndButton}>
          <h2 className={css.title}>My daily norma</h2>
          <button className={css.closeButton} onClick={onModalClose}>
            <ReactSVG src={close} className={css.closeIcon} />
          </button>
        </div>

        <div className={css.explanation}>
          <div className={css.containerForCalc}>
            <p className={css.text}>
              For girl:
              <span className={css.blueText}>V=(M*0,03) + (T*0,4)</span>
            </p>
            <p className={css.text}>
              For man:
              <span className={css.blueText}>V=(M*0,04) + (T*0,6)</span>
            </p>
          </div>

          <div className={css.containerForSmallText}>
            <p className={css.smallText}>
              <span style={{ color: 'var(--color-primary)' }}>*</span> V is the
              volume of the water norm in liters per day, M is your body weight,
              T is the time of active sports, or another type of activity
              commensurate in terms of loads (in the absence of these, you must
              set 0)
            </p>
          </div>
        </div>

        <DailyNormaModalForm />
      </div>
    </div>
  );
};

export default DailyNormaModal;
