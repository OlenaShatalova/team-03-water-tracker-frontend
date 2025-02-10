import { useDispatch } from 'react-redux';
import { loginFields } from '../../utils/schemas/UserInfoSchema';
import { login } from '../../redux/auth/operations';
import { loginSchema } from '../../utils/schemas/UserInfoSchema';
import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import { ErrorToast } from '../../utils/errorToast';
import { SuccessToast } from '../../utils/successToast';

const SigninPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async formValue => {
    try {
      await dispatch(login(formValue)).unwrap();
      SuccessToast('Successfully signed in!');
    } catch (error) {
      ErrorToast(error.message || 'Login failed!');
    }
  };

  return (
    <main className="signInUpPages">
      <Container>
        <AuthForm
          title={'Sign In'}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
          fields={loginFields}
          btnText={'Sign In'}
          linkTo={'/signup'}
          linkText={'Sing Up'}
          showForgotPassword={true} //додав
        ></AuthForm>
      </Container>
    </main>
  );
};

export default SigninPage;
