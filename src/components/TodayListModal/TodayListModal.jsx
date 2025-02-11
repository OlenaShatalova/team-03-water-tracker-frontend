import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useEffect, useId } from 'react';
import { ReactSVG } from 'react-svg';
import * as Yup from 'yup';

import close from '../../assets/icons/close.svg';
import cup from '../../assets/icons/cup.svg';
import minus from '../../assets/icons/solid.svg';
import plus from '../../assets/icons/plus.svg';

import css from './TodayListModal.module.css';
import Input from '../Input/Input';
import { SuccessToast } from '../../utils/successToast.js';
import { ErrorToast } from '../../utils/errorToast.js';

import { updateWaterVolume } from '../../redux/water/waterOperations.js';

const validationSchema = Yup.object({
  time: Yup.string().required('Required'),
  water: Yup.number().min(10, 'Minimum 10 ml').required('Required'),
});

const TodayListModal = ({ isOpen, onRequestClose, id, waterVolume, time }) => {
  const dispatch = useDispatch();

  const initialValues = {
    time: time || '07:00',
    water: waterVolume || 0,
  };

  const timeId = useId();
  const waterId = useId();

  const handleSubmit = async (values, actions) => {
    // console.log({ values });
    if (
      values.time === initialValues.time &&
      values.water === initialValues.water
    ) {
      onRequestClose();
      return;
    }

    try {
      const now = new Date();
      const [hours, minutes] = values.time.split(':');

      const formattedTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      ).toISOString();

      const waterData = {
        waterVolume: values.water,
        date: formattedTime,
      };

      await dispatch(updateWaterVolume({ id, waterData })).unwrap();

      SuccessToast('Successfully edited water record!');
      onRequestClose();
    } catch (error) {
      ErrorToast(
        error.message || 'Failed to edit water record. Please try again.'
      );
      onRequestClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose]);

  if (!isOpen) return null;

  return (
    <div onClick={onRequestClose} className={css.modalOverlay}>
      <div onClick={e => e.stopPropagation()} className={css.modal}>
        <div className={css.containerForTitleAndButton}>
          <h2 className={css.title}>Edit the entered amount of water</h2>

          <button className={css.closeButton} onClick={onRequestClose}>
            <ReactSVG src={close} className={css.icon} />
          </button>
        </div>

        <div className={css.dailyWaterDataWrapper}>
          <ReactSVG src={cup} className={css.cupIcon} />
          <p className={css.dailyWaterVolume}>{waterVolume} ml</p>
          <p className={css.dailyWaterTime}>{time} </p>
        </div>

        <p className={css.subTitle}>Correct entered data:</p>

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
                    onClick={() => setFieldValue('water', values.water + 50)}
                    className={css.roundButtons}
                  >
                    <ReactSVG src={plus} className={css.plusIcon} />
                  </button>
                </div>
              </div>

              <div>
                <label className={css.text} htmlFor="time">
                  Recording time:
                </label>
                <Field
                  as={Input}
                  placeholder="07:00"
                  type="text"
                  name="time"
                  id={timeId}
                />
              </div>

              <div className={css.containerBeforeValue}>
                <label htmlFor="water">
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
                  id={waterId}
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

export default TodayListModal;
