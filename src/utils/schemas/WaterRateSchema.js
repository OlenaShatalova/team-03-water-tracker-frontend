import * as Yup from 'yup';

export const validationSchema = Yup.object({
  gender: Yup.string().required('Required'),
  weight: Yup.number()
    .typeError('Must be a number')
    .positive('Must be a positive number')
    .min(20, 'Must be at least 20 kg')
    .max(400, 'Must be less than 400 kg')
    .required('Required'),
  sportTimes: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Cannot be negative')
    .max(24, 'Too many hours')
    .required('Required'),
  finalNumber: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Cannot be negative')
    .max(15, 'Too much water')
    .required('Required')
    .test(
      'is-decimal',
      'Must be a valid number (e.g., 1.5, 2.3)',
      value =>
        value === undefined || /^(\d+(\.\d{1,2})?)$/.test(value.toString())
    ),
});
