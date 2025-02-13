import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { closeModal } from "../../redux/water/waterSlice";
// import { SuccessToast } from "../../utils/successToast";
// import { fetchWaterRate } from "../../redux/water/waterOperations";
// import { ErrorToast } from "../../utils/errorToast";

import Input from '../Input/Input';

import { handleSubmit } from './SubmitFunction';
import useCalculateWaterRate from '../../utils/useCalculateWaterRate';
import { validationSchema } from '../../utils/schemas/WaterRateSchema';

import { selectDailyNorm } from '../../redux/auth/selectors';

import css from './DailyNormaModalForm.module.css';

const DailyNormaModalForm = () => {
  const dispatch = useDispatch();

  const dailyNorm = useSelector(selectDailyNorm);

  const initialValues = {
    gender: 'For woman',
    weight: '20',
    sportTimes: '0',
    dailyNorm: dailyNorm / 1000,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const calculatedNumber = useCalculateWaterRate(formValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values, dispatch)}
      // Handle form value changes
      validateOnChange={true}
      validate={values => {
        setFormValues(values);
      }}
    >
      {({ handleChange }) => (
        <Form>
          <div>
            <p className={css.subTitle}>Calculate your rate:</p>
            <div className={css.radioContainer}>
              <div className={css.radio}>
                <Field
                  className={css.radioButton}
                  type="radio"
                  name="gender"
                  value="For woman"
                  id="womanBtnId"
                  onChange={handleChange}
                />
                <label htmlFor="womanBtnId">For woman</label>
              </div>

              <div className={css.radio}>
                <Field
                  className={css.radioButton}
                  type="radio"
                  name="gender"
                  value="For man"
                  id="manBtnId"
                  onChange={handleChange}
                />
                <label htmlFor="manBtnId">For man</label>
              </div>
            </div>
            <ErrorMessage
              name="gender"
              component="span"
              className={css.errorMessage}
            />
          </div>

          <div className={css.containerForQuestion}>
            <label htmlFor="weightId">Your weight in kilograms:</label>
            <Field
              as={Input}
              placeholder={0}
              type="number"
              name="weight"
              id="weightId"
              onChange={handleChange}
            />
          </div>

          <div className={css.containerForQuestion}>
            <label htmlFor="sportTimesId">
              The time of active participation in sports or other activities
              with a high physical. Load in hours:
            </label>
            <Field
              as={Input}
              placeholder={0}
              type="number"
              name="sportTimes"
              id="sportTimesId"
              onChange={handleChange}
            />
          </div>

          <div className={css.containerForWater}>
            <p className={css.textWidth}>
              The required amount of water in liters per day:
            </p>
            <p className={css.valueOfWater}>
              {calculatedNumber !== 0 && `${calculatedNumber} L`}
            </p>
          </div>

          <div>
            <label className={css.subTitle} htmlFor="finalNumberId">
              Write down how much water you will drink:
            </label>
            <Field
              as={Input}
              placeholder={0}
              step="0.1"
              type="number"
              name="dailyNorm"
              id="finalNumberId"
            />
          </div>

          <button className={css.button} type="submit">
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DailyNormaModalForm;
