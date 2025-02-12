import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentDate,
  selectIsAddWaterModalOpen,
} from '../../redux/water/waterSelectors';
import { closeModal } from '../../redux/water/waterSlice';
import { Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useId } from 'react';
import css from './AddWaterModal.module.css';
import Input from '../Input/Input';
import * as Yup from 'yup';
import { SuccessToast } from '../../utils/successToast.js';
import { ErrorToast } from '../../utils/errorToast.js';
import { addWater } from '../../redux/water/waterOperations.js';
import { ReactSVG } from 'react-svg';
import plus from '../../assets/icons/plus.svg';
import close from '../../assets/icons/close.svg';
import minus from '../../assets/icons/solid.svg';

const validationSchema = Yup.object({
  time: Yup.string().required('Required'),
  water: Yup.number().min(10, 'Minimum 10 ml').required('Required'),
});

const AddWaterModal = () => {
  const currentTime = useSelector(selectCurrentDate);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);

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

  const formattedTime = new Date(currentTime).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const initialValues = {
    time: formattedTime,
    water: 0,
  };

  const time = useId();
  const water = useId();

  const onModalClose = useCallback(() => {
    dispatch(closeModal('isAddWaterOpen'));
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    try {
      const now = new Date();
      const [hours, minutes] = values.time.split(':');

      const formattedTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      ).toISOString(); // Генерує ISO 8601

      const waterData = {
        waterVolume: values.water,
        date: formattedTime, // Правильний формат для Joi
      };

      console.log('waterData:', waterData);
      await dispatch(addWater(waterData)).unwrap();

      actions.resetForm();
      onModalClose();
      SuccessToast('Successfully added water record!');
    } catch (error) {
      ErrorToast(
        error.message || 'Failed to add water record. Please try again.'
      );
    }
  };
  // const onAddWater = (waterData) => {
  //     const water = {
  //         ...waterData,
  //     }
  //     const action = addWater(water);
  //     dispatch(action)
  // }

  // закриття модалки на esc
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
          <h2 className={css.title}>Add water</h2>
          <button className={css.closeButton} onClick={onModalClose}>
            <ReactSVG src={close} className={css.closeIcon} />
          </button>
        </div>
        <p className={css.subTitle}>Choose a value:</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div>
                <p className={css.text}>Amount of water:</p>
                <div className={css.buttonsContainer}>
                  <button
                    type="button"
                    onClick={() => {
                      if (values.water > 0) {
                        setFieldValue('water', values.water - 50);
                      }
                    }}
                    className={css.roundButtons}
                  >
                    <ReactSVG src={minus} className={css.minusIcon} />
                  </button>
                  <div className={css.valueOfWater}>
                    <p className={css.valueNumber}>{values.water} ml</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFieldValue('water', values.water + 50)} // Обновляем значение воды через Formik
                    className={css.roundButtons}
                  >
                    <ReactSVG src={plus} className={css.plusIcon} />
                  </button>
                </div>
              </div>

              <div>
                <label className={css.text} htmlFor={time}>
                  Recording time:
                </label>
                <Field
                  as={Input}
                  placeholder="07:00"
                  type="time"
                  name="time"
                  id={time}
                />
              </div>

              <div className={css.containerBeforeValue}>
                <label htmlFor={water}>
                  <p className={css.subTitle}>
                    Enter the value of the water used:
                  </p>
                </label>
                <Field
                  as={Input}
                  value={values.water}
                  onChange={handleChange}
                  placeholder="50"
                  type="number"
                  name="water"
                  id={water}
                  autoFocus={true}
                />
              </div>

              <div className={css.buttonAndNumberContainer}>
                <p className={css.valueNumber}>{values.water} ml</p>
                <button className={css.button} type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddWaterModal;
