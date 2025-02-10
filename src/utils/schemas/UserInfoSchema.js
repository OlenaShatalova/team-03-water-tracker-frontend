import * as Yup from 'yup';

const emailRegexp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export const UserInfoSchema = Yup.object({
  gender: Yup.string().oneOf(['male', 'female']),
  name: Yup.string().max(32, 'Name must be at most 32 symbols'),
  email: Yup.string()
    .matches(emailRegexp, 'Invalid email address')
    .required('Email is required'),
  oldPassword: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols'),
  repeatPassword: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

// Поля для логіну

export const loginFields = [
  {
    name: 'email',
    type: 'text',
    label: 'Enter your email',
    placeholder: 'E-mail',
    autoFocus: 'autoFocus',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Enter your password',
    placeholder: 'Password',
  },
];

// Схема валідації для логіну

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters'),
});

// Поля для реєстрації

export const registerFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'E-mail',
    autoFocus: 'autoFocus',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
  {
    name: 'repeatPassword',
    type: 'password',
    label: 'Repeat password',
    placeholder: 'Repeat password',
  },
];

// Схема валідації для реєстрації
export const registerSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});
