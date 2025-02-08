import { useDispatch } from 'react-redux';
import { loginFields } from '../../utils/schemas/UserInfoSchema';
import { login } from '../../redux/auth/operations';
import { loginSchema } from '../../utils/schemas/UserInfoSchema';
import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';

const SigninPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = formValue => {
    dispatch(login(formValue));

    // formAction.resetForm();
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
        ></AuthForm>
      </Container>
    </main>
  );
};

export default SigninPage;
