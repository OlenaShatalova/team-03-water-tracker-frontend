import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserInfoSchema } from '../../utils/schemas/UserInfoSchema';
import { ErrorToast } from '../../utils/errorToast';
import { SuccessToast } from '../../utils/successToast';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import { register } from '../../redux/auth/operations';
import { selectAuthError, selectIsLoggedIn } from '../../redux/auth/selectors';

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
      ErrorToast('Registration error: ' + authError);
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

    dispatch(register(userData))
      .unwrap()
      .then(() => {
        SuccessToast('Registration successful!');
        navigate('/signin'); // Переадресація на сторінку входу
      })
      .catch(error => {
        ErrorToast('Registration failed: ' + error);
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
          validationSchema={UserInfoSchema}
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
