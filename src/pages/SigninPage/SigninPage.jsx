import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import LoaderFallback from '../../components/LoaderFallback/LoaderFallback';

import { ErrorToast } from '../../utils/errorToast';
import { SuccessToast } from '../../utils/successToast';

import { login } from '../../redux/auth/operations';

import { loginSchema, loginFields } from '../../utils/schemas/UserInfoSchema';
// import { loginFields } from '../../utils/schemas/UserInfoSchema';

const SigninPage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async formValue => {
    try {
      await dispatch(login(formValue)).unwrap();
      SuccessToast('Successfully signed in!');
    } catch (error) {
      ErrorToast(error.message || 'Email or password is wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signInUpPages">
      <Container>
        {loading ? (
          <LoaderFallback />
        ) : (
          <AuthForm
            title={'Sign In'}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
            fields={loginFields}
            btnText={'Sign In'}
            linkTo={'/signup'}
            linkText={'Sign Up'}
            showForgotPassword={true} //додав
          ></AuthForm>
        )}
      </Container>
    </main>
  );
};

export default SigninPage;
