import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  registerFields,
  registerSchema,
} from '../../utils/schemas/UserInfoSchema';
import { ErrorToast } from '../../utils/errorToast';
import { SuccessToast } from '../../utils/successToast';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import { register } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const authError = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // useEffect(() => {
  //   if (authError) {
  //     ErrorToast('Registration error: ' + authError);
  //   }
  // }, [authError]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); // MVP-2: автоматичне перенаправлення на HomePage після реєстрації
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (formValues, formActions) => {
    const userData = { email: formValues.email, password: formValues.password };

    dispatch(register(userData))
      .unwrap()
      .then(() => {
        SuccessToast('Registration successful!');
        navigate('/signin'); // Перенаправлення на сторінку входу
      })
      .catch(error => {
        ErrorToast(
          error.message || 'Registration failed! Please try again later'
        );
        // if (error.message.includes('User with this email already exists')) {
        //   formActions.setFieldError(
        //     'email',
        //     'Користувач з таким email вже існує'
        //   );
        // } else {
        //   ErrorToast('Registration failed: ' + error);
        // }
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
