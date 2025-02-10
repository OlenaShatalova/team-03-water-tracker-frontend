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
import Icon from '../Icon/Icon.jsx';
import { SuccessToast } from '../../utils/successToast.js';
import { ErrorToast } from '../../utils/errorToast.js';
import { addWater } from '../../redux/water/waterOperations.js';

const validationSchema = Yup.object({
  time: Yup.string().required('Required'),
  water: Yup.number().min(10, 'Minimum 10 ml').required('Required'),
});

const AddWaterModal = () => {
  const currentTime = useSelector(selectCurrentDate);
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

  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);
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
    } catch {
      ErrorToast('Failed to add water record. Please try again.');
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
            <Icon
              name="icon-cross"
              width={24}
              height={24}
              color="#407BFF"
              className={css.icon}
            />
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
                    <Icon
                      name="icon-minus"
                      width={24}
                      height={24}
                      color="#407BFF"
                      className={css.icon}
                    />
                  </button>
                  <div className={css.valueOfWater}>
                    <p className={css.valueNumber}>{values.water} ml</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFieldValue('water', values.water + 50)} // Обновляем значение воды через Formik
                    className={css.roundButtons}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 5.25C12.1989 5.25 12.3897 5.32902 12.5303 5.46967C12.671 5.61032 12.75 5.80109 12.75 6V11.25H18C18.1989 11.25 18.3897 11.329 18.5303 11.4697C18.671 11.6103 18.75 11.8011 18.75 12C18.75 12.1989 18.671 12.3897 18.5303 12.5303C18.3897 12.671 18.1989 12.75 18 12.75H12.75V18C12.75 18.1989 12.671 18.3897 12.5303 18.5303C12.3897 18.671 12.1989 18.75 12 18.75C11.8011 18.75 11.6103 18.671 11.4697 18.5303C11.329 18.3897 11.25 18.1989 11.25 18V12.75H6C5.80109 12.75 5.61032 12.671 5.46967 12.5303C5.32902 12.3897 5.25 12.1989 5.25 12C5.25 11.8011 5.32902 11.6103 5.46967 11.4697C5.61032 11.329 5.80109 11.25 6 11.25H11.25V6C11.25 5.80109 11.329 5.61032 11.4697 5.46967C11.6103 5.32902 11.8011 5.25 12 5.25Z" fill="#407BFF" />
                    </svg>
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
                  id={time}
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
                  id={water}
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
