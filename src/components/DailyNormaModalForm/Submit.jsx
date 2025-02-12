import { Field, Form, Formik } from 'formik';
import css from './DailyNormaModalForm.module.css';
// import { Input } from "../Input/Input.jsx";
import { useDispatch } from 'react-redux';
import {
  fetchWaterRate,
  fetchWaterToday,
} from '../../redux/water/waterOperations';
import { closeModal } from '../../redux/water/waterSlice';
import { SuccessToast } from '../../utils/successToast';
import { ErrorToast } from '../../utils/errorToast';
import { validationSchema } from '../../utils/schemas/WaterRateSchema';

const initialValues = {
  dailyNorm: '',
};

const Submit = () => {
  const dispatch = useDispatch();
  const handleSubmit = async values => {
    try {
      const dailyNorm = values.dailyNorm * 1000;
      console.log('dailyNorm:', dailyNorm);

      await dispatch(fetchWaterRate(dailyNorm));
      await dispatch(fetchWaterToday).unwrap();

      dispatch(closeModal('isWaterRateOpen'));
      SuccessToast('Successfully set your water rate!');
    } catch {
      ErrorToast('Failed to set water rate. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label className={css.subTitle} htmlFor="dailyNorm">
            Write down how much water you will drink:
          </label>
          <Field
            // as={Input}
            placeholder={0}
            step="0.1"
            type="number"
            name="dailyNorm"
            id="dailyNorm"
          />
        </div>

        <button className={css.button} type="submit">
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default Submit;
