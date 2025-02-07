import * as Yup from 'yup';

const emailRegexp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export const UserInfoSchema = Yup.object({
  gender: Yup.string().oneOf(['man', 'woman']),
  name: Yup.string().max(32, 'Name must be at most 32 symbols'),
  email: Yup.string()
    .matches(emailRegexp, 'Invalid email address')
    .required('Email is required'),
  oldpassword: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols'),
});
