import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { login } from '../../redux/auth/operations';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters'),
});

const loginFields = [
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

const SigninPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formValue, formAction) => {
    console.log(formValue, formAction);
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
