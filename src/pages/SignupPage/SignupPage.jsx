import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect } from 'react';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import { register } from '../../redux/auth/operations';
import { selectAuthError, selectIsLoggedIn } from '../../redux/auth/selectors';

const registerSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});

const registerFields = [
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

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (authError) {
      console.error('Registration error:', authError);
    }
  }, [authError]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // MVP-2: автоматичне перенаправлення на HomePage після реєстрації
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (formValues, formActions) => {
    const userData = { email: formValues.email, password: formValues.password };

    // console.log('Data sent to server:', userData);
    // Додано для діагностики

    dispatch(register(userData)) // Виправлено: тепер відправляємо очищені дані
      .unwrap()
      .then(() => {
        // console.log('Registration successful!');
        navigate('/signin'); // Переадресація на сторінку входу
      })
      .catch(error => {
        console.error('Registration failed:', error); // Додано для точнішої діагностики
      })
      .finally(() => formActions.setSubmitting(false));
  };

  return (
    <main className="signInUpPages">
      <Container>
        <AuthForm
          title={'Sign Up'}
          initialValues={{ email: '', password: '', repeatPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
          fields={registerFields}
          btnText={'Sign Up'}
          linkTo={'/signin'}
          linkText={'Already have an account? Sign In'}
        />
      </Container>
    </main>
  );
};

export default SignupPage;
