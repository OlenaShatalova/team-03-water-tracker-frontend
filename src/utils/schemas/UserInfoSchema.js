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
  password: Yup.string()
    .min(8, 'Password must be at least 8 symbols')
    .max(64, 'Password must be at most 64 symbols'),
  // repeatPassword: Yup.string().when('password', {
  //   is: password => password && password.length > 0, // Якщо поле password заповнене
  //   then: Yup.string()
  //     .required('Repeat password is required')
  //     .test('passwords-match', 'Passwords must match', function (value) {
  //       return value === this.parent.password; // Порівнюємо значення repeatPassword з password
  //     }),
  //   otherwise: Yup.string().notRequired(), // Якщо password не заповнене — поле repeatPassword не є обов'язковим
  // }),
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
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});
